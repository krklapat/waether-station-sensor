- Weather Station Transformer API

-- Endpoint
POST /transform


-- Input JSON Example

{
  {"sampledVoltage": 3.45}
}

-- Output JSON Example

{
  "sampledVoltage": 3.45
}

-- Design Explanation
The Transformer receives sampled voltage via HTTPS in JSON format and converts it to a temperature value. The API is simple, consistent with the Sampler, and easy to integrate into the pipeline. This design keeps the pipeline modular and allows new computation logic to be added without affecting upstream or downstream components.