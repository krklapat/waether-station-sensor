- Weather Station Sampler API

-- Endpoint
POST /sample

-- Description
The sampler receives voltage readings from a sensor through a REST API. 
The data is sent using JSON over HTTP and the sampler processes the voltage value and returns a response.

-- Input JSON Example

{
  "voltage": 3.21,
  "timestamp": 1712000000
}

-- Output JSON Example

{
  "sampled_voltage": 3.21,
  "status": "accepted"
}

-- Design Explanation
The sampler is implemented as a Node.js REST service. Sensors send voltage readings using JSON via the POST /sample endpoint. 
The sampler processes the data and returns a response indicating the sampled value. 
This design allows the sensor and sampler to operate as independent services in the pipeline.