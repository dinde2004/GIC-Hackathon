"""
Main entry point of the application
"""

from os import environ
import sys
import psycopg2

import uvicorn
from src.commons.utils.env_config import EnvConfig
from src.app import server
from src.example_service.entry_points import db_test_api

from src.ws_connection import ConnectionManager

# def test_db_connection():
#     try:
#         # connection = psycopg2.connect(
#         #     dbname=environ.get("POSTGRES_DB"),
#         #     user=environ.get("POSTGRES_USER"),
#         #     password=environ.get("POSTGRES_PASSWORD"),
#         #     host="db",  # This should match the service name in docker-compose.yml
#         # )
        
#         connection = connect_to_database()
#         if connection is None:
#             raise Exception("Failed to establish database connection")
        
#         cursor = connection.cursor()
#         cursor.execute("SELECT 1")
#         cursor.fetchone()
#         print("Database connection successful")
#         cursor.close()
#         connection.close()
#     except Exception as e:
#         print(f"Error connecting to database: {e}")
#         sys.exit(1)

# env = "local"
# if len(sys.argv) > 1:
#     env = sys.argv[1]
# EnvConfig(env=env)  # load the config

app = server.create_server()
app.include_router(db_test_api.router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app", host="0.0.0.0", port=int(environ.get("PORT", 8000)), reload=True
    )