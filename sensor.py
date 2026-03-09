import time
import random

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
            print(f"Voltage reading: {voltage} V")
            time.sleep(1)


if __name__ == "__main__":
    sensor = Sensor()
    sensor.run()
