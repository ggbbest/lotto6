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
const { wrap } = require('module');
const dbCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
dbCon.connect();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
// app.use(cors(corsOptions));
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


var indexRouter = require('./routes/index');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', indexRouter);

//#########################################################################
// app.get('/hello', (req, res) => {
//     res.send({ hello : 'Hello react' });
// })
//#########################################################################
app.get('/api/getLotto/:id', (req, res) => {
    dbCon.query("SELECT * FROM lotto where sendTr='"+req.params.id+"'", (err, data) => {
        if(!err) {
            res.header("Content-Type: application/json")
            res.send(JSON.stringify(data))
        } else {
            res.send(err);
        }
    })
})

app.get('/api/week', (req, res) => {
    dbCon.query("SELECT '1' id, concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ) as yyyyw, concat( DATE_FORMAT(NOW(), '%Y') ,'년' ,WEEK(NOW()),'주차' ) as yyyywkr FROM DUAL;", (err, data) => {
        if(!err)
        {
            res.header("Content-Type: application/json")
            res.send(JSON.stringify(data))
        }else {
            res.send(err);
        }
    });
})

app.post('/api/setLotto', (req, res) => {
    // if(!req.body.yyyymmdd || req.body.yyyymmdd.length < 6){
    //     // 400 Bad Request
    //     res.status(400).send('yyyymmdd is required and should be minimum 6 characters.');
    //     return;
    // 
    console.log("#### server 89 #### ");
    // console.log("#### server 89 #### "+ req.body.numb_tot +" : req.body.numb_tot ");
    
    let numb_tot = [req.body.num1,req.body.num2,req.body.num3,req.body.num4,req.body.num5,req.body.num6]
    //전체 번호는 소팅되서 저장 되게
    numb_tot.sort(function(a, b)  {
        if(a > b) return 1;
        if(a === b) return 0;
        if(a < b) return -1;
      });

    //.slice().sort();
    const lottoNo = {
        // id: lottoNo.length + 1,
        chips: req.body.chips,
        // addr: req.body.addr,
        // numb_tot: req.body.numb_tot,
        num1: req.body.num1,
        num2: req.body.num2,
        num3: req.body.num3,
        num4: req.body.num4,
        num5: req.body.num5,
        num6: req.body.num6,
        sendTr: req.body.tx_hash
    };
    
    let _sql ="";
    _sql =_sql +"insert into `lotto` (`yyyy`,`wk`,`yyyymmdd`,`chips`,`addr`,`sendTr` ";
    _sql =_sql +",`numb_tot`,`numb1`,`numb2`,`numb3`,`numb4`,`numb5`,`numb6`) ";
    _sql =_sql +"select YEAR(NOW()), WEEK(NOW()), DATE_FORMAT(NOW(), '%Y%m%d'), ";
    _sql =_sql + lottoNo.chips+" chips, '' addr, '"+lottoNo.sendTr+"' sendTr ";
    _sql =_sql +",'"+numb_tot+"','"+lottoNo.num1+"','"+lottoNo.num2+"','"+lottoNo.num3+"','"+lottoNo.num4+"','"+lottoNo.num5+"','"+lottoNo.num6+"' ";
    _sql =_sql +"from dual; ";

    console.log(timestamp() +":"+_sql);
    dbCon.query(_sql, (err, data) => { if(!err) { res.send(lottoNo); } else { res.send(err); } });
    // courses.push(lottoNo);
    // res.send(lottoNo);
});

function timestamp(){ 
    var today = new Date(); 
    today.setHours(today.getHours() + 9); 
    return today.toISOString().replace('T', ' ').substring(0, 19); 
}

//#########################################################################

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/getLotto/:id', (req, res) => {
//     let _yyyy       = "";
//     let _wk         = "";
//     let _regdate    = "";
//     let _chips      = "";
//     let _sendTr     = "";
//     let _numb_tot   = "";
//     let _sql = "SELECT yyyy,wk,regdate,chips,sendTr,numb_tot FROM lotto where sendTr='"+req.params.id+"'";
//     // console.log("######### server.js ######### "+_sql);
//     dbCon.query(_sql, function (err, rows, fields) {
//         if (err) {
//             // console.log('query is not excuted. select fail...\n' + err);
//         }
//         else {
//             // console.log("######### server.js ######### rows.length : "+rows.length);
//             if (rows.length > 0) {
//                 _yyyy       = rows[0].yyyy;
//                 _wk         = rows[0].wk;
//                 _regdate    = rows[0].regdate;
//                 _chips      = rows[0].chips;
//                 _sendTr     = rows[0].sendTr;
//                 _numb_tot   = rows[0].numb_tot;
//                 console.log("######### server.js ######### _numb_tot : "+_numb_tot);
//             }
//         }
//     })
//     // console.log("######### server.js ######### "+_numb_tot);
//     res.render('vtr', { title: 'lotto number', yyyy:_yyyy, wk:_wk, regdate:_regdate, chips:_chips, sendTr : _sendTr, numb_tot : _numb_tot});
// })

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})