const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userdb",
});

db.connect(err => {
    if (err) return console.log("DB Error:", err);
    console.log("Connected to database");
});

app.get("/", (req, res) => {
    res.send("Backend working fine!");
});

app.get('/login', (req, res) => {
    const { email, password } = req.query;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length > 0) {
            res.json({ message: "Login successful", user: results[0] });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "User registered successfully", result });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
