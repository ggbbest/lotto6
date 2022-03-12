var express = require('express');
var router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
const dbCon = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
dbCon.connect();

// npm i sync-mysql
var db_config = require(__dirname + '/database.js');// 2020-09-13
var sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());

// /* GET home page. */
router.get('/', function(req, res, next) {
  let result = sync_connection.query("SELECT yyyy,wk,sum(chips) sum_chips FROM lotto where yyyy=YEAR(NOW()) and wk=WEEK(NOW())");
  _yyyy       = result[0].yyyy;
  _wk         = result[0].wk;
  _sum_chips  = result[0].sum_chips;

  res.render('index', { title: 'main', "yyyy":_yyyy, "wk":_wk, "sum_chips":_sum_chips });
});

//lottoNum
router.get('/lottoNum/:id', function(req, res, next) {
  let _yyyy       = "";
  let _wk         = "";
  let _regdate    = "";
  let _chips      = "";
  let _sendTr     = "";
  let _numb_tot   = "";
  let result = sync_connection.query("SELECT yyyy,wk,regdate,chips,sendTr,numb_tot FROM lotto where sendTr='"+req.params.id+"'");
  _yyyy       = result[0].yyyy;
  _wk         = result[0].wk;
  _regdate    = result[0].regdate;
  _chips      = result[0].chips;
  _sendTr     = result[0].sendTr;
  _numb_tot   = result[0].numb_tot;
  console.log("######### server.js ######### "+timestamp()+" _numb_tot : "+_numb_tot);
  
  // console.log("######### server.js ######### "+_numb_tot);
  res.render('lottoNum', { title: 'lotto number', "yyyy":_yyyy, "wk":_wk, "regdate":_regdate, "chips":_chips, "sendTr": _sendTr, "numb_tot" : _numb_tot });
});

function timestamp(){ 
  var today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

module.exports = router;
