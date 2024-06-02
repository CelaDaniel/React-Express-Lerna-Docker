#!/bin/bash

# Source environment variables
cd "$(dirname "$0")"
source ../.env

# Define color variables
export HIGHLIGHT_GREEN='\033[1;32m'
export HIGHLIGHT_BLUE='\033[1;34m'
export HIGHLIGHT_RED='\033[1;31m'
export NC='\033[0m'

# Function to echo colored text
echo_highlight() {
    local color="$1"
    shift
    echo -e "${color}$*${NC}"
}

# Function to wrap text and print with borders
wrap_text() {
    local text="$1"
    local width="$2"
    local color="$3"
    local wrapped_text=$(echo -e "$text" | fold -s -w "$width")

    local max_length=0
    while IFS= read -r line; do
        ((${#line} > max_length)) && max_length=${#line}
    done < <(echo -e "$wrapped_text")

    local filler=$(printf '─%.0s' $(seq 1 $((max_length + 2))))

    echo_highlight "$color" "┌${filler}┐"
    while IFS= read -r line; do
        printf "$color│ %-${max_length}s │${NC}\n" "$line"
    done < <(echo -e "$wrapped_text")
    echo_highlight "$color" "└${filler}┘"
}

# Function to run Python scripts with error checking
run_python_script() {
    local script_path="$1"
    python3 "$script_path"
    if [ $? -eq 0 ]; then
        echo "Python script executed successfully."
    else
        echo_highlight "$HIGHLIGHT_RED" "Python script failed."
    fi
}

# Function to start Docker Compose with or without logs
docker_compose_up() {
    local logs="$1"
    if [ "$logs" = "logs" ]; then
        docker-compose up --build
    else
        docker-compose up --build -d
    fi
}

# Function to stop Docker Compose and remove volumes
docker_compose_down() {
    docker-compose down -v
}
