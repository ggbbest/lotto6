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

// var db_config = require(__dirname + '/database.js');// 2020-09-13
// var sync_mysql = require('sync-mysql'); //2020-01-28
// let sync_connection = new sync_mysql(db_config.constr());

// let result1 = sync_connection.query("SELECT id, c4ei_addr, c4ei_balance FROM user WHERE c4ei_addr='" + txt_to_address + "'");
// let to_id = result1[0].id;


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
            if(!err) {
                // res.header("Content-Type: application/json")
                res.send({ data : data });
            } else {
                res.send(err);
            }
        })
    });
    dbCon.end();
})
app.get('/api/week', (req, res) => {
    dbCon.connect(function(err) {
        if (err){console.log(err);}
        dbCon.query("SELECT '1' id, concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ) as yyyyw FROM DUAL;", (err, data) => {
            if(!err)
            {
                res.header("Content-Type: application/json")
                res.send(JSON.stringify(data))
                // res.send({ data : data });
            }else {
                res.send(err);
            }
        });
    });
    // setTimeout(dbCon.end() , 1500)
})
//#########################################################################


app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})