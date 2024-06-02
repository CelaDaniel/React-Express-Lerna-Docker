#!/bin/bash

# Correctly source common.sh relative to the script location
source "$(dirname "$0")/common.sh"

# Main function to exit the application
exit_app() {
    local app_name="$1"
    run_python_script "../cli/python/backup_databases.py"
    if [ $? -ne 0 ]; then
        wrap_text "🚨 Exiting '$app_name' app due to script failure" 50 "${HIGHLIGHT_RED}"
    fi
    docker_compose_down
    wrap_text "✅ Exited '$app_name' app and cleaned up successfully" 50 "${HIGHLIGHT_GREEN}"
}

# Execute the exit routine
exit_app "$APP_NAME"
