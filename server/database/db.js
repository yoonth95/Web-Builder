// npm install dotenv
require('dotenv').config();

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: `${process.env.DB_PASSWORD}`,
    database: 'udemy'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to the database');
});

module.exports = conn;