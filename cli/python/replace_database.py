import subprocess
import os

# MySQL connection settings
host = os.getenv('DB_HOST', 'mysql')
port = os.getenv('DB_PORT', '3306')
user = os.getenv('DB_USER', 'root')
password = os.getenv('DB_PASSWORD', 'root')

# SQL file and database name
sql_file = os.path.join(os.getcwd(), "../backup/mysql/monsters_db.sql")
database_name = "monsters_db"

def recreate_database():
    """Deletes the database if it exists, creates a new one, and imports an SQL file."""
    try:
        # Connect to MySQL and drop the existing database if it exists
        cmd_drop = [
            "docker", "exec", "-i", "monsters-mysql_be",
            "mysql", "-h", host, "-P", port, "-u", user, "-p" + password, 
            "-e", f"DROP DATABASE IF EXISTS {database_name}; CREATE DATABASE {database_name};"
        ]
        subprocess.run(cmd_drop, check=True, capture_output=True, text=True)
        
        # Import the SQL file into the newly created database
        with open(sql_file, 'rb') as file:
            cmd_import = [
                "docker", "exec", "-i", "cms-mysql-be",
                "mysql", "-h", host, "-P", port, "-u", user, "-p" + password, database_name
            ]
            subprocess.run(cmd_import, stdin=file, check=True)
        print(f"Database {database_name} recreated and data imported successfully.")

    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    recreate_database()
