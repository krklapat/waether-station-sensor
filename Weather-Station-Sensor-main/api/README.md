
-Weather Station Rest API

--End Point
POST /temperature


-- Input JSON Example

{
  "temperature": 24.5,
  "timestamp": "2026-03-10T14:20:00Z"
}


-- Output JSON Example

{
  "status": "stored",
  "id": 1
}


-- Explanation
The REST API receives temperature data from the Transformer and stores it in the database.
 It uses a simple JSON format to keep communication consistent with the rest of the pipeline.
 The API validates the incoming data before storing it to ensure correctness. 
This design keeps the components loosely coupled, making the system easier to extend and maintain.
