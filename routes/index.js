// https://scope.klaytn.com/account/0x000000000000000000000000000000000000dead?tabId=txList burning address
var express = require('express');
var router = express.Router();
var path = require('path');

// var cookieParser = require('cookie-parser');
const STATIC_PATH = path.join(__dirname, '../public')

// add web3 2021-11-08
//npm install web3
// const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.C4EI_RPC));

// npm i caver-js
// const Caver = require('caver-js')
// const caver = new Caver(process.env.CEIK_RPC)
// const wallet = caver.klay.accounts.create(process.env.C4EI_ADDR_PWD);

// npm i sync-mysql
// var db_config = require(__dirname + '/database.js');// 2020-09-13
// var sync_mysql = require('sync-mysql'); //2020-01-28
// let sync_connection = new sync_mysql(db_config.constr());

// const mysql2 = require('mysql2/promise'); 
// const pool = mysql2.createPool(db_config.constr());
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


router.get('/getLotto/:id', function(req, res, next) {
  let _yyyy       = "";
  let _wk         = "";
  let _regdate    = "";
  let _chips      = "";
  let _sendTr     = "";
  let _numb_tot   = "";
  let _sql = "SELECT yyyy,wk,regdate,chips,sendTr,numb_tot FROM lotto where sendTr='"+req.params.id+"'";
  // console.log("######### server.js ######### "+_sql);
  dbCon.query(_sql, function (err, rows, fields) {
      if (err) {
          // console.log('query is not excuted. select fail...\n' + err);
      }
      else {
          // console.log("######### server.js ######### rows.length : "+rows.length);
          if (rows.length > 0) {
              _yyyy       = rows[0].yyyy;
              _wk         = rows[0].wk;
              _regdate    = rows[0].regdate;
              _chips      = rows[0].chips;
              _sendTr     = rows[0].sendTr;
              _numb_tot   = rows[0].numb_tot;
              console.log("######### server.js ######### "+timestamp()+" _numb_tot : "+_numb_tot);
          }
      }
  })
  // console.log("######### server.js ######### "+_numb_tot);
  res.render('vtr', { title: 'lotto number', yyyy:_yyyy, wk:_wk, regdate:_regdate, chips:_chips, sendTr : _sendTr, numb_tot : _numb_tot});
});

function timestamp(){ 
  var today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

module.exports = router;
