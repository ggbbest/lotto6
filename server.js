const express = require('express');
const app = express();
const PORT = process.env.PORT || 3007;
// const db = require('./config/db');
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4000" //클라이언트(react) 쪽의 콜스 허용
};
  

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Server Response Success');
})
app.get('/hello', (req, res) => {
    res.send({ hello : 'Hello react' });
})
app.get('/api/info', (req, res) => {
    db.connect(function(err) {
        if (err) throw err;
        console.log('Connected');
        db.query("SELECT * FROM user_info", (err, data) => {
            if(!err) res.send({ data : data });
            else res.send(err);
        })
    });
})
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})