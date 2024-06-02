import subprocess
import os
import sys

# MySQL connection settings from environment variables or default values
host = os.getenv('DB_HOST', 'mysql')
port = os.getenv('DB_PORT', '3306')
user = os.getenv('DB_USER', 'root')
password = os.getenv('DB_PASSWORD', 'root')

# Backup directory within the current working directory
backup_dir = os.path.join(os.getcwd(), "../backup/mysql/")

# Databases to exclude from backup
excluded_databases = ["information_schema", "mysql", "performance_schema", "sys"]

def get_databases():
    """Fetches a list of databases from MySQL, excluding certain databases."""
    try:
        cmd = [
            "docker", "exec", "-i", "monsters-mysql_be",
            "mysql", "-h", host, "-P", port, "-u", user, "-p" + password, "-e", "SHOW DATABASES;"
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            print("Error executing command:", ' '.join(cmd))
            print("Error message:", result.stderr.strip())
            sys.exit(1)  # Exit with non-zero status if command fails

        databases = [db for db in result.stdout.strip().split('\n')[1:] if db and db not in excluded_databases]
        return databases

    except subprocess.CalledProcessError as e:
        print(f"An error occurred while fetching databases: {e}")
        sys.exit(1)  # Exit with non-zero status if exception occurs

def export_database(db_name):
    file_name = os.path.join(backup_dir, f"{db_name}.sql")
    print(f"Backing up {db_name} to {file_name}")

    with open(file_name, "wb") as file:
        try:
            subprocess.run(
                ["docker", "exec", "-i", "monsters-mysql_be", "mysqldump", "-h", host, "-P", port, "-u", user, "-p" + password, db_name],
                stdout=file, check=True
            )
        except subprocess.CalledProcessError as e:
            print(f"An error occurred while exporting {db_name}: {e}")
            sys.exit(1)  # Exit with non-zero status if command fails

if __name__ == "__main__":
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)

    databases = get_databases()
    if not databases:
        print("No databases found to backup. Exiting.")
        sys.exit(1)  # Exit with non-zero status if no databases found

    for db in databases:
        export_database(db)
