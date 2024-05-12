import psycopg2


def create_table():
    conn_params = {
        "dbname": "schedules_fkpi",
        "user": "postgres",
        "password": "15243",
        "host": "localhost"
    }

    # SQL command to create a table
    create_table_command = """
    CREATE TABLE IF NOT EXISTS schedule (
        id SERIAL PRIMARY KEY,
        group_name VARCHAR(255) NOT NULL,
        day INTEGER NOT NULL,
        lesson_number INTEGER NOT NULL,
        lesson_type VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        place VARCHAR(255) NOT NULL,
        subgroup INTEGER NOT NULL,
        teacher VARCHAR(255) NOT NULL,
        week INTEGER NOT NULL
    );
    """

    conn = None
    cur = None

    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Execute the create table command
        cur.execute(create_table_command)

        # Commit the changes to the database
        conn.commit()

        print("Table created successfully")
    except psycopg2.DatabaseError as e:
        print(f"An error occurred: {e}")
    finally:
        # Ensure that the cursor and connection are closed properly
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


if __name__ == "__main__":
    create_table()
