var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// const PORT = process.env.PORT || 3007;
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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.get('/api/getLotto/:id', (req, res) => {
//   dbCon.query("SELECT * FROM lotto where sendTr='"+req.params.id+"'", (err, data) => {
//       if(!err) {
//           res.header("Content-Type: application/json")
//           res.send(JSON.stringify(data))
//       } else {
//           res.send(err);
//       }
//   })
// })

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
      chainId: req.body.chainId,
      addr: req.body.addr,
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
  _sql =_sql +"insert into `lotto` (`yyyy`,`wk`,`yyyymmdd`,`chips`,`chainId`,`addr`,`sendTr` ";
  _sql =_sql +",`numb_tot`,`numb1`,`numb2`,`numb3`,`numb4`,`numb5`,`numb6`) ";
  _sql =_sql +"select YEAR(NOW()), WEEK(NOW()), DATE_FORMAT(NOW(), '%Y%m%d'), ";
  _sql =_sql + lottoNo.chips+" chips,'"+lottoNo.chainId+"' chainId,'"+lottoNo.addr+"' addr, '"+lottoNo.sendTr+"' sendTr ";
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
//###############################################################
// app.use('/', express.static( path.join(__dirname, 'public') ))
// app.get('/', function(req, res){
//   res.sendFile( path.join(__dirname, 'public/main.html') )
// }) 

app.use('/lotto', express.static( path.join(__dirname, 'lotto/build') ))
app.get('/lotto', function(req, res){
    res.sendFile( path.join(__dirname, 'lotto/build/index.html') )
})

app.use('/lotto2', express.static( path.join(__dirname, 'lotto2/build') ))
app.get('/lotto2', function(req, res){
    res.sendFile( path.join(__dirname, 'lotto2/build/index.html') )
})

//###############################################################

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
