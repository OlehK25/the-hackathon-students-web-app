import os.path
from parser import parse_schedule
from insertion_data_to_bd import insert_lesson


def main():
    for file in os.scandir('D:\\NAU HUB\\hackaton_project\\pythonProject\\schedules'):
        full_path = file.path
        group_info = parse_schedule(full_path)
        for group_name in group_info:
            lessons = group_info[group_name]
            print(group_name)
            for lesson in lessons:
                print(lesson)
                insert_lesson(group_name, lesson)


if __name__ == "__main__":
    main()
