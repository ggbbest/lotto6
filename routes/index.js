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
  sql = sql +"SELECT yyyy, wk, sum(klay_sum_chips) klay_sum_chips, sum(c4ei_sum_chips) c4ei_sum_chips, sum(ceik_sum_chips) ceik_sum_chips "; 
  sql = sql +" , sum(ksp_sum_chips) ksp_sum_chips , sum(bck_sum_chips) bck_sum_chips FROM ( ";
  sql = sql +"SELECT IFNULL(yyyy,YEAR(NOW())) AS yyyy, IFNULL(wk,WEEK(NOW())) AS wk, ";
  sql = sql +"CASE WHEN coin_name = 'KLAY' THEN IFNULL(sum(chips),0) ELSE 0 END AS klay_sum_chips,  ";
  sql = sql +"CASE WHEN coin_name = 'C4EI' THEN IFNULL(sum(chips),0) ELSE 0 END AS c4ei_sum_chips,  ";
  sql = sql +"CASE WHEN coin_name = 'CEIK' THEN IFNULL(sum(chips),0) ELSE 0 END AS ceik_sum_chips,  ";
  sql = sql +"CASE WHEN coin_name = 'KSP' THEN IFNULL(sum(chips),0) ELSE 0 END AS ksp_sum_chips,    ";
  sql = sql +"CASE WHEN coin_name = 'BCK' THEN IFNULL(sum(chips),0) ELSE 0 END AS bck_sum_chips     ";
  sql = sql +"FROM lotto where yyyy=YEAR(NOW()) and wk=WEEK(NOW()) ";
  sql = sql +"GROUP BY coin_name ) ds ";
  sql = sql +"GROUP BY yyyy, wk ";
  let result = sync_connection.query(sql);
  //console.log(result.length+":result.length");
  let _yyyy             = "";
  let _wk               = "";
  let _c4ei_sum_chips   = 0;
  let _klay_sum_chips   = 0;
  let _ceik_sum_chips   = 0;
  let _ksp_sum_chips    = 0;
  let _bck_sum_chips    = 0;
  if(result.length>0){
    _yyyy             = result[0].yyyy;
    _wk               = result[0].wk;
    _c4ei_sum_chips   = result[0].c4ei_sum_chips;
    _klay_sum_chips   = result[0].klay_sum_chips;
    _ceik_sum_chips   = result[0].ceik_sum_chips;
    _ksp_sum_chips    = result[0].ksp_sum_chips;
    _bck_sum_chips    = result[0].bck_sum_chips;      
  }
  let sql2 = "";
  sql2 = sql2 +"SELECT yyyy,wk,coin_name,sumchips,sum_sendchips,real_tot,real_half_tot,amt1st,amt2nd,amt3rd,regdate FROM lotto_sum_money WHERE `yyyy`=YEAR(NOW()) AND `wk`=WEEK(NOW())";
  let result2 = sync_connection.query(sql2);

  let sql3 = "";
  sql3 = sql3 +"SELECT yyyy,wk,coin_name,c_rank,rankCnt,chipSum FROM lotto_rank WHERE `yyyy`=YEAR(NOW()) AND `wk`=WEEK(NOW())-1";
  let result3 = sync_connection.query(sql3);

  let sql4 = "";
  sql4 = sql4 +"SELECT yyyy,wk,yyyymmdd,numb_tot,numb1,numb2,numb3,numb4,numb5,numb6,numb7 FROM lotto_num WHERE yyyy=YEAR(NOW()) and wk=WEEK(NOW())-1"; 
  let result4 = sync_connection.query(sql4);

  console.log(timestamp()+"######### index.js ######### "+" _yyyy : "+_yyyy+" / _wk : "+_wk+" / c4ei_sum_chips : "+_c4ei_sum_chips+" / klay_sum_chips : "+_klay_sum_chips);
  res.render('index', { title: 'main', "yyyy":_yyyy, "wk":_wk, "c4ei_sum_chips":_c4ei_sum_chips, "klay_sum_chips":_klay_sum_chips , "ceik_sum_chips":_ceik_sum_chips
  , "ksp_sum_chips":_ksp_sum_chips, "bck_sum_chips":_bck_sum_chips , "result2":result2, "result3":result3, "result4":result4 });
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

//https://lotto.c4ei.net/myNum/0x0eEA7CA12D4632FF1368df24Cb429dBEa17dD71D
router.get('/myNum/:id', function(req, res, next) {
  let sql ="";
  sql = sql +" SELECT `yyyy`,`wk`,`yyyymmdd`,`chips`,`chainId`,`coin_name`,`addr`,`sendTr` ,`numb_tot`,`regdate` ";
  sql = sql +" FROM lotto WHERE addr='"+req.params.id+"'  ";
  sql = sql +" AND regdate > DATE_ADD(CURRENT_DATE(), INTERVAL -30 DAY) ";
  sql = sql +" ORDER BY coin_name, chainid ";

  let result = sync_connection.query(sql);
  console.log("######### server.js ######### "+timestamp()+" myNum addr: "+req.params.id);
  res.render('myNum', { title: 'my number', "result":result });
});

router.get('/klipSuccess/:id', function(req, res, next) {
  console.log("######### index.js 100 ######### "+timestamp()+" param: "+req.params.id);
  res.render('klipSuccess', { title: 'klipSuccess', "result":req.params.id });
});

router.get('/numReg', function(req, res, next) {
  let sql1 = "";
  sql1 = sql1 +"SELECT YEAR(NOW()) yyyy, WEEK(NOW()) wk FROM dual";
  let result1 = sync_connection.query(sql1);
  let _yyyy             = result1[0].yyyy;
  let _wk               = result1[0].wk;
  res.render('numReg', { title: 'numReg', "yyyy":_yyyy, "wk":_wk });
});

router.post('/numRegSet', function(req, res, next) {

  let numb_tot = [req.body.numb1,req.body.numb2,req.body.numb3,req.body.numb4,req.body.numb5,req.body.numb6]; //,req.body.numb7
  const lottoNo = {
      num1: req.body.numb1, num2: req.body.numb2, num3: req.body.numb3,
      num4: req.body.numb4, num5: req.body.numb5, num6: req.body.numb6,
      num7: req.body.numb7
  };
  
  let _yyyy = req.body.yyyy, _wk=req.body.wk;
  let _num1 = lottoNo.num1, _num2 = lottoNo.num2, _num3 = lottoNo.num3;
  let _num4 = lottoNo.num4, _num5 = lottoNo.num5, _num6 = lottoNo.num6;
  let _num7 = lottoNo.num7;

  let _sql0 = "DELETE FROM lotto_num WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"';";
  console.log(timestamp() +":"+_sql0);
  dbCon.query(_sql0, (err, data) => { if(!err) {  } else { res.send(err); } });
  
  let _sql="";
  _sql =_sql +"insert into `lotto_num` (`yyyy`,`wk`,`yyyymmdd`,`numb_tot`,`numb1`,`numb2`,`numb3`,`numb4`,`numb5`,`numb6`,`numb7`) ";
  _sql =_sql +"select '"+_yyyy+"', '"+_wk+"', DATE_FORMAT(NOW(), '%Y%m%d'), '"+numb_tot+"', '"+_num1 +"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"','"+_num7+"' ";
  _sql =_sql +"from dual; ";

  console.log(timestamp() +":"+_sql);
  dbCon.query(_sql, (err, data) => { if(!err) { res.send(lottoNo); } else { res.send(err); } });
  
  // -- step 1
  let _sql1_1 ="";
  _sql1_1 =_sql1_1 +" UPDATE lotto SET c1=0, c2=0, c3=0, c4=0, c5=0, c6=0 WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"' ";
  
  console.log(timestamp() +":"+_sql1_1);
  dbCon.query(_sql1_1, (err, data) => { if(!err) {  } else { console.log(" _sql1_1 err : "+err); } });

  let _sql1 ="";
  _sql1 =_sql1 +" UPDATE lotto SET ";
	_sql1 =_sql1 +" c1 = case when numb1 IN ('"+_num1+"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"') then 1 ELSE 0 END, ";
	_sql1 =_sql1 +" c2 = case when numb2 IN ('"+_num1+"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"') then 1 ELSE 0 END, ";
	_sql1 =_sql1 +" c3 = case when numb3 IN ('"+_num1+"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"') then 1 ELSE 0 END, ";
	_sql1 =_sql1 +" c4 = case when numb4 IN ('"+_num1+"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"') then 1 ELSE 0 END, ";
	_sql1 =_sql1 +" c5 = case when numb5 IN ('"+_num1+"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"') then 1 ELSE 0 END, ";
	_sql1 =_sql1 +" c6 = case when numb6 IN ('"+_num1+"','"+_num2+"','"+_num3+"','"+_num4+"','"+_num5+"','"+_num6+"') then 1 ELSE 0 END  ";
  _sql1 =_sql1 +" WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"' ";
  
  console.log(timestamp() +":"+_sql1);
  dbCon.query(_sql1, (err, data) => { if(!err) {  } else { console.log(" _sql1 err : "+err); } });

// -- step 2
let _sql2 ="";
_sql2 =_sql2 +" UPDATE lotto SET c_tot = (c1+c2+c3+c4+c5+c6) WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"';";
console.log(timestamp() +":"+_sql2);
dbCon.query(_sql2, (err, data) => { if(!err) {  } else { console.log(" _sql2 err : "+err); } });

// -- step 3 - find 5 numb match and check plus num set tot 5.5 --> 2nd win
let _sql3 ="";
_sql3 =_sql3 +" UPDATE lotto SET c_tot = 5.5 WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"' AND c_tot = 5 ";
_sql3 =_sql3 +"   AND (numb1='"+_num7+"' OR numb2='"+_num7+"' OR numb3='"+_num7+"' OR numb4='"+_num7+"' OR numb5='"+_num7+"' OR numb6='"+_num7+"'); ";
console.log(timestamp() +":"+_sql3);
dbCon.query(_sql3, (err, data) => { if(!err) {  } else { console.log(" _sql3 err : "+err); } });

// -- step 4 - set rank
let _sql4 ="";
_sql4 =_sql4 +" UPDATE lotto ";
_sql4 =_sql4 +" SET c_rank =  case c_tot when 6 then 1 when 5.5 then 2 when 5 then 3 when 4 then 4 when 3 then 5 ELSE 0 END  ";
_sql4 =_sql4 +" WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"' AND c_tot > 2; ";
console.log(timestamp() +":"+_sql4);
dbCon.query(_sql4, (err, data) => { if(!err) {  } else { console.log(" _sql4 err : "+err); } });

// -- step 5 -- 4,5 sending ship calcu
let _sql5 ="";
_sql5 =_sql5 +" UPDATE lotto ";
_sql5 =_sql5 +" SET sendchips = case c_rank when 4 then chips*50 when 5 then chips*5 ELSE 0 END  ";
_sql5 =_sql5 +" WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"' AND (c_rank =4 OR c_rank =5) ; ";
console.log(timestamp() +":"+_sql5);
dbCon.query(_sql5, (err, data) => { if(!err) {  } else { console.log(" _sql5 err : "+err); } });


// -- step 6 -- 4,5 sending ship calcu
let _sql6_1 = " DELETE FROM lotto_sum_money WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"';";
console.log(timestamp() +":"+_sql6_1);
dbCon.query(_sql6_1, (err, data) => { if(!err) {  } else { console.log(" _sql6_1 err : "+err); } });

let _sql6 ="";
_sql6 =_sql6 +" INSERT INTO lotto_sum_money (yyyy,wk, coin_name,sumchips,sum_sendchips,real_tot,real_half_tot,amt1st,amt2nd,amt3rd) ";
_sql6 =_sql6 +" SELECT yyyy,wk, coin_name, SUM(chips) sumchips, SUM(sendchips) sum_sendchips, (SUM(chips)-SUM(sendchips)) real_tot ";
_sql6 =_sql6 +" , (SUM(chips)-SUM(sendchips))*0.5 real_half_tot ";
_sql6 =_sql6 +" , (SUM(chips)-SUM(sendchips))*0.5*0.75 amt1st ";
_sql6 =_sql6 +" , (SUM(chips)-SUM(sendchips))*0.5*0.125 amt2nd ";
_sql6 =_sql6 +" , (SUM(chips)-SUM(sendchips))*0.5*0.125 amt3rd ";
_sql6 =_sql6 +" FROM lotto  ";
_sql6 =_sql6 +" WHERE `yyyy`='"+_yyyy+"' AND `wk`='"+_wk+"' ";
_sql6 =_sql6 +" GROUP BY yyyy,wk, coin_name; ";
console.log(timestamp() +":"+_sql6);
dbCon.query(_sql6, (err, data) => { if(!err) {  } else { console.log(" _sql6 err : "+err); } });


// -- step 7 -- lotto_rank summary
let _sql7_1 = " DELETE FROM lotto_rank WHERE yyyy='"+_yyyy+"' AND wk='"+_wk+"';";
console.log(timestamp() +":"+_sql7_1);
dbCon.query(_sql7_1, (err, data) => { if(!err) {  } else { console.log(" _sql7_1 err : "+err); } });

let _sql7 ="";
_sql7 =_sql7 +" INSERT INTO lotto_rank (yyyy,wk, coin_name, c_rank,rankCnt,chipSum) ";
_sql7 =_sql7 +" SELECT yyyy,wk, coin_name, c_rank, SUM(1) rankCnt, SUM(chips) chipSum ";
_sql7 =_sql7 +" FROM lotto  ";
_sql7 =_sql7 +" WHERE `yyyy`='"+_yyyy+"' AND `wk`='"+_wk+"' ";
_sql7 =_sql7 +" AND c_rank >0 ";
_sql7 =_sql7 +" GROUP BY c_rank, coin_name; ";
console.log(timestamp() +":"+_sql7);
dbCon.query(_sql7, (err, data) => { if(!err) {  } else { console.log(" _sql7 err : "+err); } });


});


function timestamp(){ 
  var today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

module.exports = router;
