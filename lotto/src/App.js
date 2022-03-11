import "./App.css";
import React, { useState } from "react";

import Header from "./Header";
import Results from "./Results";
import Coupon from "./Coupon";
import ButtonStart from "./ButtonStart";
import Display from "./Display";
import ButtonReset from "./ButtonReset";

import axios from 'axios'; 
// const dotenv = require('dotenv');
// dotenv.config();
// const mysql = require('mysql');
// const dbCon = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_DATABASE
// });

const App = () => {
  const numbers = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45,46,47,48,49,
  ];
  const awards = { three: 5, four: 50, five: 5000, six: 3000000 };

  const [playerNumbers, setPlayerNumbers] = useState([]);
  const [drawedNumbers, setDrawedNumbers] = useState([]);
  const [gamesNumber, setGamesNumber] = useState(0);
  const [hits, setHits] = useState(0);
  const [money, setMoney] = useState(0);

  const addPlayerNumbers = (number, event) => {
    if (playerNumbers.length < 6 && !playerNumbers.includes(number)) {
      const numbers = [...playerNumbers];
      numbers.push(number);
      setPlayerNumbers(numbers);
      event.target.classList.toggle("selected");
    }
    if (playerNumbers.includes(number)) {
      let numbers = [...playerNumbers];
      numbers = numbers.filter((num) => num !== number);
      setPlayerNumbers(numbers);
      event.target.classList.toggle("selected");
    }
  };

  const checkWin = (playerNumbers, drawedNumbers) => {
    const winNumbers = [];

    playerNumbers.forEach(function (number) {
      for (let i = 0; i < 6; i++) {
        if (number === drawedNumbers[i]) {
          winNumbers.push(number);
        }
      }
    });

    const hits = winNumbers.length;
    setHits(hits);

    if (hits === 3) {
      setMoney((prev) => prev + awards.three);
    } else if (hits === 4) {
      setMoney((prev) => prev + awards.four);
    } else if (hits === 5) {
      setMoney((prev) => prev + awards.five);
    } else if (hits === 6) {
      setMoney((prev) => prev + awards.six);
    }
  };
  // async
  function saveLottoNum() {
    // try {
      let numb_tot = playerNumbers[0] +","+playerNumbers[1] +","+playerNumbers[2] +","+playerNumbers[3] +","+playerNumbers[4] +","+playerNumbers[5];
      console.log("#### App 70 #### "+ numb_tot +" : numb_tot ");
      const data = {
        chips: "1",
        numb_tot: numb_tot,
        num1: playerNumbers[0],
        num2: playerNumbers[1],
        num3: playerNumbers[2],
        num4: playerNumbers[3],
        num5: playerNumbers[4],
        num6: playerNumbers[5]
      };
      // console.log(response);
      axios.post('https://lotto.c4ei.net/api/setLotto', data)
      .then((res) => {
          console.log(res.data)
      }).catch((error) => {
          console.log(error)
      });
  }

  const startDraw = () => {
    if (playerNumbers.length === 6) {
      const optionNumbers = [...numbers];
      const drawedNumbers = [];
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * optionNumbers.length);
        drawedNumbers.push(optionNumbers[index]);
        optionNumbers.splice(index, 1);
      }

      // playerNumbers.forEach(function (number) {
      //   for (let i = 0; i < 6; i++) {
      //     // number
      //   }
      // });
      saveLottoNum()
      // let numb_tot = playerNumbers[0] +","+playerNumbers[1] +","+playerNumbers[2] +","+playerNumbers[3] +","+playerNumbers[4] +","+playerNumbers[5];
      // var sql = "insert into `lotto` (`yyyy`,`wk`,`yyyymmdd`,`chips`,`addr`,`sendTr` ,`numb_tot`,`numb1`,`numb2`,`numb3`,`numb4`,`numb5`,`numb6`)";
      // sql = sql +" select YEAR(NOW()), WEEK(NOW()), DATE_FORMAT(NOW(), '%Y%m%d'), ";
      // sql = sql +" 1 chips, '' addr, '' sendTr ";
      // sql = sql +" ,'"+numb_tot+"',"+numb_tot+" ";
      // sql = sql +" from dual ";
      // console.log("#### App 111 #### "+ sql);

      // try { 
      //   dbCon.beginTransaction(); 
      //   dbCon.query(sql); 
      //   dbCon.commit(); 
      //   console.log('insert success!'); 
      // } catch (err) { 
      //   dbCon.rollback(); 
      //   throw err; 
      // } finally { 
      //   // dbCon.close();
      // }
      // dbCon.query(sql, function(err, result) {
      //   if (err) 
      //     console.log(err);
      //     throw err;
      // });

      setDrawedNumbers(drawedNumbers);
      setGamesNumber((prevNumber) => prevNumber + 1);
      checkWin(playerNumbers, drawedNumbers);
    }
  };
  const resetGame = () => {
    const selectedNumbers = [...document.querySelectorAll(".selected")];
    selectedNumbers.forEach((num) => num.classList.remove("selected"));
    setPlayerNumbers([]);
    setDrawedNumbers([]);
    setGamesNumber(0);
    setHits(0);
    setMoney(0);
  };
/* eslint-disable */
  return (
    <div className="app">
      <Header />

      <main>
        <Display drawedNumbers={drawedNumbers} />
        <Coupon numbers={numbers} add={addPlayerNumbers} />
        <Results games={gamesNumber} hits={hits} money={money} />
        <section className="controls">
          <ButtonReset reset={resetGame} />
          <ButtonStart playerNumbers={playerNumbers} start={startDraw} />
        </section>
      </main>
    </div>
  );
};

export default App;
