import pytest
from transformer import voltage_to_temperature, app

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_voltage_to_temperature():
    assert voltage_to_temperature(0.5) == 0
    assert voltage_to_temperature(1.5) == 100

def test_transform_endpoint(client):
    response = client.post('/transform', json={"sampledVoltage": 2.0})
    assert response.status_code == 200
    assert response.get_json()["temperatureC"] == 150.0

def test_missing_voltage(client):
    response = client.post('/transform', json={})
    assert response.status_code == 400
