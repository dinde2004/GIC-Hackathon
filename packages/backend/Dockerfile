# Dockerfile
FROM python:3.10

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# # Make the startup script executable
# RUN chmod +x startup.sh

# # Set the entrypoint to the startup script
# ENTRYPOINT ["./startup.sh"]

# Expose the port the app runs on
EXPOSE 8000

# Command to run the main application (replace with your actual command)
CMD ["python3", "./main.py"]