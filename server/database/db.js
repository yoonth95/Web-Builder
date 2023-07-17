// npm install dotenv
require('dotenv').config();

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    port: '3306',
    user: 'udemy',
    password: `${process.env.DB_PASSWORD}`,
    database: 'udemy'
});


conn.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to the database');
});

module.exports = conn;