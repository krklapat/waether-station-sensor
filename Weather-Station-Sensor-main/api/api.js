const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// create database
const db = new sqlite3.Database('./temperature.db');

// create table
db.run(`
CREATE TABLE IF NOT EXISTS temperatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    timestamp TEXT
)
`);

// POST endpoint
app.post('/temperature', (req, res) => {
    const { temperature, timestamp } = req.body;

    if (temperature === undefined || !timestamp) {
        return res.status(400).json({ error: "Invalid input" });
    }

    db.run(
        "INSERT INTO temperatures (temperature, timestamp) VALUES (?, ?)",
        [temperature, timestamp],
        function(err) {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            res.json({
                status: "stored",
                id: this.lastID
            });
        }
    );
});

app.listen(4000, () => {
    console.log("REST API running on port 4000");
});
