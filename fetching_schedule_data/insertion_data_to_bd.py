import psycopg2


def insert_lesson(group, lesson):
    conn_params = {
        "dbname": "schedules_fkpi",
        "user": "postgres",
        "password": "15243",
        "host": "localhost"
    }
    conn = psycopg2.connect(**conn_params)
    sql = """
        INSERT INTO schedule (group_name, day, lesson_number, lesson_type, name, place, subgroup, teacher, week)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cur = conn.cursor()
    try:
        cur.execute(sql, (group, lesson.day, lesson.lesson_number, lesson.lesson_type,
                          lesson.name, lesson.place, lesson.subgroup, lesson.teacher, lesson.week))
        conn.commit()
        print("Lesson added successfully")
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")
    finally:
        cur.close()
        conn.close()


def insertion(array_schedules):
    conn_params = {
        "dbname": "schedules_fkpi",
        "user": "postgres",
        "password": "15243",
        "host": "localhost"
    }
    conn = psycopg2.connect(**conn_params)
    try:
        for schedule in array_schedules:
            for group_name, lessons in schedule.items():
                for lesson in lessons:
                    lesson.group_name = group_name  # Set group_name here if not set in Lesson
                    insert_lesson(lesson, conn)
    finally:
        conn.close()
