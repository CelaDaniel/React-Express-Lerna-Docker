#!/bin/bash

# Correctly source common.sh relative to the script location
source "$(dirname "$0")/common.sh"

# Main function to start the application
start_app() {
	local mode="$1"
	local app_name="$2"

	if [ "$mode" = "logs" ]; then
		wrap_text "🚀 Starting '$app_name' app containers with logs" 50 "${HIGHLIGHT_BLUE}"
		docker_compose_up "logs"
	else
		wrap_text "🚀 Starting '$app_name' app containers" 50 "${HIGHLIGHT_GREEN}"
		docker_compose_up
	fi
}

# Start the application with the provided mode and app name
start_app "$1" "$APP_NAME"
