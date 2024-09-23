import pytest
import asyncio
from os import environ
from ..src.app import server
from ..src.commons.utils.env_config import EnvConfig
from pymongo import MongoClient


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session", autouse=True)
def get_db_and_app(event_loop):
    EnvConfig(env="test")
    app = server.create_server()
    db = server.get_mongo()
    yield app, db
    server._mongo_client.close()  # type: ignore


@pytest.fixture(scope="function", autouse=True)
def setup_and_tear_down():
    _db = MongoClient(environ["DATABASE_URL"]).jouvire
    delete_all_tables(_db)
    yield
    delete_all_tables(_db)


def delete_all_tables(db):
    collections = db.list_collection_names()
    for collection_name in collections:
        collection = db[collection_name]
        collection.drop()
