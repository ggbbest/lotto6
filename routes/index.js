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
  let sql = "";
  sql = sql +"SELECT yyyy, wk, sum(klay_sum_chips) klay_sum_chips, sum(c4ei_sum_chips) c4ei_sum_chips, sum(ceik_sum_chips) ceik_sum_chips FROM ( ";
  sql = sql +"SELECT IFNULL(yyyy,YEAR(NOW())) AS yyyy, IFNULL(wk,WEEK(NOW())) AS wk, ";
  sql = sql +"CASE WHEN coin_name = 'KLAY' THEN IFNULL(sum(chips),0) ELSE 0 END AS klay_sum_chips,  ";
  sql = sql +"CASE WHEN coin_name = 'C4EI' THEN IFNULL(sum(chips),0) ELSE 0 END AS c4ei_sum_chips,  ";
  sql = sql +"CASE WHEN coin_name = 'CEIK' THEN IFNULL(sum(chips),0) ELSE 0 END AS ceik_sum_chips   ";
  sql = sql +"FROM lotto  where yyyy=YEAR(NOW()) and wk=WEEK(NOW()) ";
  sql = sql +"GROUP BY coin_name ) ds ";
  sql = sql +"GROUP BY yyyy, wk ";
  let result = sync_connection.query(sql);
  let _yyyy       = result[0].yyyy;
  let _wk         = result[0].wk;
  let _c4ei_sum_chips  = result[0].c4ei_sum_chips;
  let _klay_sum_chips  = result[0].klay_sum_chips;
  let _ceik_sum_chips  = result[0].ceik_sum_chips;
  // console.log("######### server.js ######### "+timestamp()+" _yyyy : "+_yyyy+" / _wk : "+_wk+" / c4ei_sum_chips : "+_c4ei_sum_chips+" / klay_sum_chips : "+_klay_sum_chips);
  res.render('index', { title: 'main', "yyyy":_yyyy, "wk":_wk, "c4ei_sum_chips":_c4ei_sum_chips, "klay_sum_chips":_klay_sum_chips , "ceik_sum_chips":_ceik_sum_chips });
});

//lottoNum
// https://lotto.c4ei.net/lottoNum/0x817b4b495bc86faee85cbb9c404e59471629e004d1d892714b0af19d2e909266
router.get('/lottoNum/:id', function(req, res, next) {
  let result = sync_connection.query("SELECT yyyy,wk,regdate,chips,chainId,coin_name,addr,sendTr,numb_tot FROM lotto WHERE sendTr='"+req.params.id+"'");
  let _yyyy       = result[0].yyyy;
  let _wk         = result[0].wk;
  let _regdate    = result[0].regdate;
  let _chips      = result[0].chips;
  let _chainId    = result[0].chainId;
  let _coin_name  = result[0].coin_name;
  let _addr       = result[0].addr;
  let _sendTr     = result[0].sendTr;
  let _numb_tot   = result[0].numb_tot;
  console.log("######### server.js ######### "+timestamp()+" _numb_tot : "+_numb_tot);
  res.render('lottoNum', { title: 'lotto number', "yyyy":_yyyy, "wk":_wk, "regdate":_regdate, "chips":_chips,"chainId":_chainId, "coin_name":_coin_name, "addr":_addr, "sendTr": _sendTr, "numb_tot" : _numb_tot });
});

function timestamp(){ 
  var today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

module.exports = router;
