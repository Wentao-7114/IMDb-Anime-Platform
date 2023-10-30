const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 3001; // Using port 3001 since React's default is 3000

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '104.155.151.193',
    user: 'sqlserver',
    password: 'cs222sqlserver',
    database: 'CS222'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO UserInfo (username, password) VALUES (?, ?)";
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).send("Internal Server Error11111");
            return;
        }
        console.log("User registered successfully");
        res.status(201).send("User registered successfully");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
``