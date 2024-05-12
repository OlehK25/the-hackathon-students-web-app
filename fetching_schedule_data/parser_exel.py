import pandas as pd
import re
from datetime import datetime, timedelta
from math import ceil

class Lesson:
    __slots__ = ["name", "lesson_type", "teacher_type", "teacher", "place", "subgroup", "week", "day", "lesson_number"]

    def __init__(self):
        self.subgroup = 0
        self.lesson_type = "generic"
        self.teacher_type = "Невідомо"
        self.teacher = "Відсутній"
        self.place = "Невідомо"

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
        repeats: int = ceil((end - starting_datetime).days / 14)

        return {
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

def parse_schedule(filepath: str) -> dict[str, list[Lesson]]:
    # Read Excel file into a DataFrame
    dfs = pd.read_excel(filepath, sheet_name=None)  # Read all sheets, returns dict of DataFrame

    lessons_list = {}

    for sheet_name, page in dfs.items():
        header = page.columns[0]
        header_parse = re.findall(r"НАУ.*?(\d*)\r(.*?)Тиждень (\d)", header)

        week_number = int(header_parse[0][2])
        group_name = header_parse[0][1].strip() + "-" + header_parse[0][0].strip()
        group_name += "Б" if int(header_parse[0][0]) < 500 else "М"

        if group_name not in lessons_list:
            lessons_list[group_name] = []

        for index, row in page.iterrows():
            if index < 2:  # Assuming first two rows are header or irrelevant
                continue

            if pd.isna(row['Lesson Day and Number']):  # Adjust column names based on your Excel
                continue

            day_matches = re.findall(r"(.+?)(\d)", row['Lesson Day and Number'])
            if day_matches:
                day = day_string_to_int(day_matches[0][0])
                lesson_number = int(day_matches[0][1])
            else:
                lesson_number = int(row['Lesson Day and Number'])

            temp_lesson = Lesson()
            temp_lesson.week = week_number
            temp_lesson.day = day
            temp_lesson.lesson_number = lesson_number
            temp_lesson.name = row['Lesson Name']
            temp_lesson.place = row['Location'].replace(" ", "")
            temp_lesson.lesson_type = row['Lesson Type']
            temp_lesson.teacher = row['Teacher']

            lessons_list[group_name].append(temp_lesson)

    return lessons_list

def day_string_to_int(day: str) -> int:
    return {
        "Пнд": 1, "Втр": 2, "Срд": 3,
        "Чтв": 4, "Птн": 5, "Сбт": 6
    }.get(day, 0)  # Default to 0 if day is not found
