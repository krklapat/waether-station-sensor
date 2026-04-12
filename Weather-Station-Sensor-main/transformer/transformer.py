from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

def voltage_to_temperature(voltage):
    # Example linear conversion: Temp (°C) = (Voltage - 0.5) * 100
    return (voltage - 0.5) * 100

@app.route('/transform', methods=['POST'])
def transform():
    data = request.get_json()
    if not data or 'sampledVoltage' not in data:
        return jsonify({"error": "sampledVoltage is required"}), 400

    voltage = data['sampledVoltage']
    temperature = voltage_to_temperature(voltage)

    try:
        requests.post("http://localhost:4000/temperature", json = {
            "temperature" : round(temperature, 2),
            "timestamp": "2026-03-10T14:20:00Z"
        })
    except:
        pass



    return jsonify({
        "temperatureC": round(temperature, 2)
    })

if __name__ == '__main__':
    app.run(port=5000)
