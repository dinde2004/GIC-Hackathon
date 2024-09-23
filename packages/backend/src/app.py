# pylint: disable=C0415
"""
Functions required for running application
"""
import time
from fastapi import FastAPI
from os import environ
import psycopg2

from fastapi.middleware.cors import CORSMiddleware
from .commons.error_handling.base_error import BaseError
from .commons.error_handling.domain_violation_error import (
    DomainViolationError,
)
from .commons.error_handling.http_error import HttpError
from .commons.error_handling.repository_error import RepositoryError
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .database import engine, SessionLocal, Base

import logging


class Server:
    # TODO ADD

    _app = FastAPI()
    # _logger = #TODO ADD

    _instance = None

    ## Make it an singleton class
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def get_app(self):
        """
        Returns the current app instance
        """
        return self._app

    def create_server(self) -> FastAPI:
        """
        Create a great FastAPI server
        """
        # self._conn = self._connect_to_db()
        # Cors Middleware
        self._add_event_handlers()
        self._add_default_routes()
        # Include routes
        self._add_routes()
        # Register Error handlers
        self._add_error_handlers()

        # Helper logs
        port = int(environ.get("PORT", 8000))
        # TODO ADD
        # self._logger.info(f"Swagger docs at http://0.0.0.0:{port}/docs")

        return self._app

    def _add_event_handlers(self):
        self._app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=True,
            allow_methods=["*"],  # Allows all methods # type: ignore
            allow_headers=["*"],  # Allows all headers
        )
        pass

    def _add_default_routes(self):
        # Health route

        @self._app.get("/")
        async def health_route():
            """
            Health check route
            """

            return {"status": "ok", "env": "local"}  # TODO CHANGE

    def _add_routes(self):
        from .example_service.entry_points.trader_routes import market_analysis_route, discoverability_route, trade_route

        self._app.include_router(market_analysis_route)
        self._app.include_router(discoverability_route)
        self._app.include_router(trade_route)

    def _add_error_handlers(self):
        self._app.add_exception_handler(BaseError, lambda req, ex: ex.respond())  # type: ignore
        self._app.add_exception_handler(DomainViolationError, lambda req, ex: ex.respond())  # type: ignore
        self._app.add_exception_handler(HttpError, lambda req, ex: ex.respond())  # type: ignore
        self._app.add_exception_handler(RepositoryError, lambda req, ex: ex.respond())  # type: ignore

    # def _connect_to_db(self, max_tries=5, delay=3):
    #     conn = None
    #     attempt = 0

    #     while attempt < max_tries:
    #         try:
    #             print(
    #                 f"Attempting to connect to the database (Attempt {attempt + 1}/{max_tries})..."
    #             )
    #             conn = psycopg2.connect(environ["DATABASE_URL"])
    #             print("Connection successful!")
    #             return conn
    #         except psycopg2.OperationalError as e:
    #             print(f"Connection failed: {e}")
    #             attempt += 1
    #             if attempt < max_tries:
    #                 print(f"Retrying in {delay} seconds...")
    #                 time.sleep(delay)
    #             else:
    #                 print("Max retries reached. Could not connect to the database.")
    #                 return None
    #         pass
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        # Initialize database tables
        logging.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)


server = Server()
