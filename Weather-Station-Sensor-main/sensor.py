import time
import random
import requests

class Sensor:

    def __init__(self):
        self.min_voltage = 0.0
        self.max_voltage = 5.0

    def generate_voltage(self):
        voltage = random.uniform(self.min_voltage, self.max_voltage)
        return round(voltage, 3)

    def run(self):
        print("Sensor started...\n")

        while True:
            voltage = self.generate_voltage()

            data = {
                "voltage": voltage,
                "timestamp": time.time()
            }

            try:
                response = requests.post("http://localhost:3000/sample", json=data)
                print(f"Sent voltage {voltage} V | Sampler response: {response.json()}")
            except:
                print(f"Voltage {voltage} V generated but sampler not reachable")

            time.sleep(1)


if __name__ == "__main__":
    sensor = Sensor()
    sensor.run()