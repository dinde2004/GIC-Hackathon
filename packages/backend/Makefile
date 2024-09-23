.PHONY: help initialise-backend build-docker remove-data clean-docker start-backend

help: 
	@echo "Usage: make [TARGET]"
	@echo "Targets:"
	@echo "  setup-venv  Installs the required packages and creates the virtual environment"
	@echo "  build-docker        Stubs the vendor data and builds the container"
	@echo "  remove-data         Removes all the current mongodb data"
	@echo "  clean-docker        Stops the container and removes the data (if the user wants to)"
	@echo "  start-backend       Starts the backend"

# Create a virtual environment in the backend directory
setup-venv:
	@python3.11 -m venv ./venv && \
	source ./venv/bin/activate && \
	pip install -r requirements.txt && \
	echo "Virtual environment created successfully" && \
	echo "To activate the virtual environment, run: source ./venv/bin/activate"

# Build the docker container
build-docker:
	@docker-compose up -d --build && \
	echo "Docker container built successfully"

# Export .env variables into the shell environment
set-env-variables:
	@export $(grep -v '^#' .env | xargs) && \
	echo "Environment variables exported successfully"

# Unset .env variables in shell environment
unset-env-variables:
	@unset export $(grep -v '^#' .env | xargs) && \
	echo "Environment variables unset successfully"