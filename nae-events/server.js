const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password : "Willie28!",
        database: "election"
    },
    console.log("Connected to the election database.")
);

app.post("/login", (req, res) => {
    const sql = `SELECT * FROM login WHERE username = ? AND password = ?`
    const params = [req.body.username, req.body.password];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(req.body);
        
        if(!result.length){
            res.status(500).json({ error: "Credentials do not exist" });
        } else {
            res.status(200).json({ sucess: true });
        }
    });
});

app.post("/signup", (req, res) => {
    const sql = `SELECT * FROM login WHERE username = ?`
    const params = [req.body.username];

    const sql2 = `INSERT INTO login (username, password) VALUES (?,?)`
    const params2 = [req.body.username, req.body.password];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        
        if(!result.length){
            db.query(sql2, params2, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                console.log(results);
                res.status(200).json({ sucess: true });
            })
        } else {
            res.status(500).json({ error: "Credentials taken"})
        }
    });
});


app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.use((req,res) => {
    res.status(404).end();
});

db.connect(err => {
    if(err) throw err;
    console.log("Database connected.");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});