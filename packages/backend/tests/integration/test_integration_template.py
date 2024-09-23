from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI() # replace this with your FastAPI app instance

client = TestClient(app)

def test_my_endpoint():
    # Make a request to your API endpoint using the test client
    response = client.get("/my_endpoint")

    # Assert the response status code and content
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}