from datetime import datetime, timedelta
from math import ceil

import tabula
import pandas
import re


class Lesson:
    __slots__ = ["group_name", "name", "lesson_type", "teacher_type", "teacher", "place", "subgroup", "week", "day",
                 "lesson_number"]
    name: str
    lesson_type: str
    # Unused
    teacher_type: str
    teacher: str
    place: str
    subgroup: int
    week: int
    day: int
    lesson_number: int

    def __init__(self):
        # Default value is a lesson for both subgroups
        self.group_name = None
        self.subgroup = 0
        self.lesson_type = "generic"
        self.teacher_type = "Невідомо"
        self.teacher = "Відустній"
        self.place = "Невідомо"

    def update_lesson_type(self):
        self.lesson_type = self.lesson_type.replace('e', 'е').replace('i', 'і').replace('o', 'о').replace('p', 'р')
        self.lesson_type = self.lesson_type.replace('a', 'а')
        match self.lesson_type:
            case "Лекція":
                self.lesson_type = "lecture"
            case "Практичне":
                self.lesson_type = "practice"
            case "Лабораторна":
                self.lesson_type = "lab"

    def generate_univera_object(self, organisation: str, division: str,
                                start: datetime, end: datetime, first_week: int) -> dict:
        days = - (start.weekday() + 1) + self.day
        if self.week == first_week and self.day <= start.weekday():
            days += 14

        starting_datetime: datetime = start + timedelta(
            weeks=(0 if self.week == first_week else 1),
            days=days,
            minutes=480 + (self.lesson_number - 1) * 110
        )

        # Calculate amount of repeats before end date
        repeats: int = ceil((end - starting_datetime).days / 14)

        result = {
            "title": self.name,
            "classroomName": self.place,
            "kind": self.lesson_type,
            "mainLecturerFullName": self.teacher,
            "lecturerFullNames": [self.teacher],
            "organisation": organisation,
            "start": starting_datetime.isoformat(),
            "end": (starting_datetime + timedelta(minutes=95)).isoformat(),
            "divisions": [division],
            "repeat": {"timezone": "Europe/Kyiv", "interval": 2, "count": repeats, "frequency": 2}
        }
        return result


def speciality_to_group_key(speciality: str) -> str:
    match speciality:
        case "Інженерія програмного забезпечення" | "Software engineering":
            return "ПІ"
        case "Безпека інформаційних і комунікаційних систем":
            return "БІ"
        case "Системи та технології кібербезпеки" | "Cybersecurity systems and technologies":
            return "СК"
        case "Управління інформаційною безпекою" | "Управління кібербезпекою та захистом інформації":
            return "УБ"
        case "Системи технічного захисту інформації, автоматизац":
            return "СЗ"


def day_string_to_int(day: str) -> int:
    match day:
        case "Пнд":
            return 1
        case "Втр":
            return 2
        case "Срд":
            return 3
        case "Чтв":
            return 4
        case "Птн":
            return 5
        case "Сбт":
            return 6


def parse_lesson_group(lesson: Lesson, row: pandas.Series, shift_value: int) -> None:
    lesson.name = row[2 + shift_value]
    if not pandas.isna(row[3 + shift_value]):
        lesson.place = row[3 + shift_value].replace(" ", "")

    lesson_teacher_type = row[4 + shift_value].split("\r")
    lesson.lesson_type = lesson_teacher_type[0]
    if len(lesson_teacher_type) > 1:
        lesson.teacher_type = lesson_teacher_type[1]
        lesson.teacher = row[5 + shift_value]


def parse_lesson_subgroup(lesson: Lesson, parsed_data: list[str]) -> None:
    lesson.name = parsed_data[0]
    lesson.place = parsed_data[1].replace(" ", "")
    lesson.lesson_type = parsed_data[2]
    lesson.teacher_type = parsed_data[3]
    lesson.teacher = parsed_data[4]


# Parses data for a subgroup lesson
def parse_lesson_data(data: str) -> list[list[str]]:
    return re.findall(
        # Хай горить у пеклі, той хто робив цей розклад і додумався пихати латинські букви в українські слова
        # Нормальний вигляд: r"^(.*?)\r?(\d{1,2}\. \d{3}\w?)?\r?(Лабораторна|Практичне|Лекція)\r?(.*?)\r?([A-ZА-ЯІЇЄ].*? .?\..?\.)$
        r"^(.*?)\r?(\d{1,2}\. \d{3}\w?)?\r?(Л(?:а|a)б(?:о|o)(?:р|p)(?:а|a)т(?:о|o)(?:р|p)н(?:а|a)|П(?:р|p)(?:а|a)ктичн(?:е|e)|Л(?:е|e)кц(?:і|i)я)\r?(.*?)\r?([A-ZА-ЯІЇЄ].*? .?\..?\.)$",
        data
    )


def create_lesson_obj(week_number: int, lesson_number: int, last_day: int) -> Lesson:
    temp: Lesson = Lesson()
    temp.week = week_number
    temp.lesson_number = lesson_number
    temp.day = last_day
    return temp


def parse_schedule(filepath: str) -> dict[str, list[Lesson]]:
    # Read pdf into list of DataFrame
    dfs = tabula.read_pdf(filepath, pages='all', lattice=True)

    # Dictionary: key - group name, value - list of lessons
    lessons_list: dict[str, list[Lesson]] = {}

    index: int
    page: pandas.DataFrame
    for index, page in enumerate(dfs):
        # For some reason some files have an extra column with no name
        shift_value: int = 0
        if page.columns[0] == "Unnamed: 0":
            shift_value = 1

        # 1 - group number, 2 - speciality name, 3 - week number
        header_parse = re.findall(r"НАУ.*?(\d*)\r(.*?)Тиждень (\d)", page.columns[0 + shift_value])

        week_number: int = int(header_parse[0][2])
        group_name: str = speciality_to_group_key(header_parse[0][1]) + "-" + str(header_parse[0][0])
        # if group number is less than 500, then it is a bachelor group
        group_name += "Б" if int(header_parse[0][0]) < 500 else "М"

        if group_name not in lessons_list:
            lessons_list[group_name] = []

        local_lessons_list: list[Lesson] = lessons_list[group_name]

        # 0 - Sunday
        last_parsed_day: int = 1

        row: pandas.Series
        # 1 - lesson day and number, 2 - lesson name, 3 - location, 4 - lesson type and teacher type, 5 - teacher
        for row in page.itertuples():
            # Iterate from the third row
            if row.Index < 2:
                continue

            current_lesson_number: int
            day_matches = re.findall(r"(.+?)(\d)", row[1 + shift_value])
            if len(day_matches) != 0:
                last_parsed_day = day_string_to_int(day_matches[0][0])
                current_lesson_number = int(day_matches[0][1])
            else:
                current_lesson_number = int(row[1 + shift_value])

            # Go further obky if the second column is not empty
            if pandas.isna(row[2 + shift_value]) and pandas.isna(row[3 + shift_value]):
                continue

            # This row is not empty only if it is a group lesson
            if not pandas.isna(row[4 + shift_value]):
                temp_lesson: Lesson = create_lesson_obj(week_number, current_lesson_number, last_parsed_day)
                parse_lesson_group(temp_lesson, row, shift_value)
                local_lessons_list.append(temp_lesson)
            else:
                if not pandas.isna(row[2 + shift_value]):
                    temp_lesson: Lesson = create_lesson_obj(week_number, current_lesson_number, last_parsed_day)
                    temp_lesson.subgroup = 1
                    parse_subgroup = parse_lesson_data(row[2 + shift_value])
                    parse_lesson_subgroup(temp_lesson, parse_subgroup[0])
                    local_lessons_list.append(temp_lesson)
                if not pandas.isna(row[3 + shift_value]):
                    temp_lesson: Lesson = create_lesson_obj(week_number, current_lesson_number, last_parsed_day)
                    temp_lesson.subgroup = 2
                    parse_subgroup = parse_lesson_data(row[3 + shift_value])
                    parse_lesson_subgroup(temp_lesson, parse_subgroup[0])
                    local_lessons_list.append(temp_lesson)

    return lessons_list
