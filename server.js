const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3007;
// const db = require('./config/db');
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4000" //클라이언트(react) 쪽의 콜스 허용
};
  
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
const dbCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//     // res.send('Server Response Success');
//     res.redirect('index');
// })
//#########################################################################
app.use( '/', express.static( path.join(__dirname, 'public') ))
app.use( '/lotto', express.static( path.join(__dirname, 'lotto/build') ))

app.get('/', function(req, res){
    res.sendFile( path.join(__dirname, 'public/main.html') )
}) 
app.get('/lotto', function(req, res){
    res.sendFile( path.join(__dirname, 'lotto/build/index.html') )
})
//#########################################################################

// app.get('/hello', (req, res) => {
//     res.send({ hello : 'Hello react' });
// })
//#########################################################################
app.get('/api/info', (req, res) => {
    dbCon.connect(function(err) {
        if (err) throw err;
        // console.log('Connected');
        dbCon.query("SELECT * FROM lotto", (err, data) => {
            if(!err) res.send({ data : data });
            else res.send(err);
        })
    });
})
app.get('/api/week', (req, res) => {
    dbCon.connect(function(err) {
        // if (err) throw err;
        if (err){console.log(err);}
        // console.log('Connected');
        dbCon.query("SELECT concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ) as yyyyw FROM DUAL;", (err, data) => {
            if(!err) res.send({ data : data });
            else res.send(err);
        });
    });
    
    // dbCon.release(function(err) {
    //     if (err){console.log(err);}
    // }); 
})
//#########################################################################


app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})