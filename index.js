const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const mysql = require('mysql');
const connection = mysql.createConnection({
    user: 'root',
    password: 'Soham0102',
    host: '127.0.0.1',
    port: 3306,
    database: 'hackathons_db'
});

function sqlPromise(query, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

app.get('/', async (req, res) => {
    res.render('home');
});

app.get('/hackathons', async (req, res) => {
    let sqlquery = `SELECT * FROM hackathons`;
    const results = await sqlPromise(sqlquery);
    const dictionary_out = { 'results': results };
    res.render('hackathons', dictionary_out);
});

app.get('/sorted-hackathons-name', async (req, res) => {
    let sqlquery = `SELECT * FROM hackathons ORDER BY h_name`;
    const results = await sqlPromise(sqlquery);
    const dictionary_out = { 'results': results };
    res.render('sorted-hackathons-name', dictionary_out);
});

app.get('/sorted-hackathons-date', async (req, res) => {
    let sqlquery = `SELECT * FROM hackathons ORDER BY h_start_date, h_end_date`;
    const results = await sqlPromise(sqlquery);
    const dictionary_out = { 'results': results };
    res.render('sorted-hackathons-date', dictionary_out);
});

app.listen(8080, "0.0.0.0", () => {
    console.log('Server started');
});
