# import psycopg2
# import os

# def connect_to_database():
#     try:
#         # Get database credentials from environment variables
#         user = os.environ.get("POSTGRES_USER")
#         password = os.environ.get("POSTGRES_PASSWORD")
#         database = os.environ.get("POSTGRES_DB")

#         db = psycopg2.connect(
#             host="db",
#             user=user,
#             password=password,
#             dbname=database,
#         )
        
#         return db
#     except psycopg2.Error as error:
#         print("Error connecting to database:", error)

# def close_connection(db):
#     db.close()

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

user = os.environ.get("POSTGRES_USER")
password = os.environ.get("POSTGRES_PASSWORD")
database = os.environ.get("POSTGRES_DB")
host = os.environ.get("POSTGRES_HOST")

DATABASE_URL = f"postgresql://{user}:{password}@db/{database}"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

