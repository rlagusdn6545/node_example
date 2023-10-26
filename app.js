const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
});

connection.connect((err) => {
    if (err) throw new Error(err);
    console.log("Connected");
    connection.query('CREATE DATABASE IF NOT EXISTS mydb', (err) => {
        if (err) throw new Error(err);
        console.log("Database created/exists");
        connection.changeUser({database: 'mydb'}, (err) =>{
            if (err) throw new Error(err);
            createTable();
        })
    })
});

function createTable() {
    connection.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(100),
        photo LONGBLOB
    )`, (err) => {
        if (err) throw new Error(err);
        console.log("Table created/exists");
    });
}

app.post('/api', (req, res) =>{
    connection.query('INSERT INTO user SET ?' ,{
        name: "HyunWoo",
        photo: Buffer.from(fs.readFileSync('./image.jpg')),
    }, (err) => {
        if (err) throw new Error(err);
        console.log("1 record inserted");
        res.end();
    })
});

app.get('/api', (req, res) => {
    connection.query('SELECT photo FROM users WHERE id = 1', (err, result) => {
        if (err) throw new Error(err);
        res.set("Content-disposition", 'inline; filename=' + "image.jpg");
        res.set("Content-Type", "image/jpg");
        res.send(result[0].photo);
    })
})

app.listen(3000);
