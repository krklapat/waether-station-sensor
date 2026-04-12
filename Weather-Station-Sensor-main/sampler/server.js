const express = require("express");
const axios = require("axios");
const sampler = require("./sampler");

const app = express();
app.use(express.json());

let failureCount = 0;
let circuitOpen = false;

app.post("/sample", async (req, res) => {

    if (circuitOpen) {
        return res.status(503).json({ error: "Circuit breaker open" });
    }

    try {
        const voltage = req.body.voltage;

        if (voltage === undefined) {
            throw new Error("Missing voltage");
        }

        // Sample the voltage
        const sampledVoltage = sampler.sampleVoltage(voltage);

        // Send to Transformer
        const transformerResponse = await axios.post(
            "http://localhost:5000/transform",
            { sampledVoltage: sampledVoltage }
        );

        failureCount = 0;

        res.json({
            sampledVoltage: sampledVoltage,
            temperatureC: transformerResponse.data.temperatureC,
            status: "accepted"
        });

    } catch (error) {

        failureCount++;

        if (failureCount >= 3) {
            circuitOpen = true;

            setTimeout(() => {
                circuitOpen = false;
                failureCount = 0;
            }, 5000);
        }

        console.error("Error:", error.message);

        res.status(400).json({ error: "Invalid voltage input or Transformer error" });
    }
});

app.listen(3000, () => {
    console.log("Sampler running on port 3000");
});
