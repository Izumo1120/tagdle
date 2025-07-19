import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='db',
            user='user',
            password='password',
            database='sample_db'
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None