import "./App.css";
import React, { useState } from "react";

import Header from "./Header";
import Results from "./Results";
import Coupon from "./Coupon";
import ButtonStart from "./ButtonStart";
import Display from "./Display";
import ButtonReset from "./ButtonReset";

import axios from 'axios'; 
import { prepare, request, getResult } from 'klip-sdk'
// import { response } from "express";

const App = () => {
  const numbers = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45
    // ,46,47,48,49,
  ];
  const awards = { three: 5, four: 50, five: 5000, six: 3000000 };

  const [playerNumbers, setPlayerNumbers] = useState([]);
  const [drawedNumbers, setDrawedNumbers] = useState([]);
  const [gamesNumber, setGamesNumber] = useState(0);
  const [hits, setHits] = useState(0);
  const [money, setMoney] = useState(0);
  // const [linkTR, setlinkTR] = useState(0);

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
  function saveLottoNum(tx_hash) {
      // console.log("#### App 70 #### "+ numb_tot +" : numb_tot ");
      const data = {
        chips: "1",
        num1: playerNumbers[0],
        num2: playerNumbers[1],
        num3: playerNumbers[2],
        num4: playerNumbers[3],
        num5: playerNumbers[4],
        num6: playerNumbers[5],
        tx_hash: tx_hash
      };
      // setlinkTR(tx_hash)
      // console.log(response);
      axios.post('https://lotto.c4ei.net/api/setLotto', data)
      .then((res) => {
          console.log(res.data)
          // response.redirect('/getLotto/'+tx_hash)
          // document.writeln("<script>https://lotto.c4ei.net/lottoNum/"+tx_hash+"</script>")
          document.writeln('<!DOCTYPE html><html lang="en"><head><meta http-equiv="refresh" conten="1;url=https://lotto.c4ei.net/lottoNum/'+tx_hash+'"><title>move</title></head><body><a href="https://lotto.c4ei.net/lottoNum/'+tx_hash+'">'+tx_hash+'</a></body></html>')
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
      sendPrepareRequest();
      // setDrawedNumbers(drawedNumbers);
      // setGamesNumber((prevNumber) => prevNumber + 1);
      // checkWin(playerNumbers, drawedNumbers);
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
///////////////////////////////////////////////////////////////////
const [SEND_REQUEST, SHOW_LOADING, SHOW_RESULT] = [1, 2, 3]

  const [step, setStep] = useState(SEND_REQUEST)

  const to = '0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e'
  const bappName = 'lotto'
  const amount = '1'

  const sendPrepareRequest = async () => {
    const res = await prepare.sendKLAY({ bappName, to, amount })

    if (res.request_key) {
      setStep(SHOW_LOADING)
      request(res.request_key)
      startPollingResult(res.request_key)
    }
  }

  const startPollingResult = (requestKey) => {
    const id = setInterval(async () => {
      const res = await getResult(requestKey)
      if (res.status === 'completed') {
        clearTimeout(id)
        setStep(SHOW_RESULT)
        if (res.result.status === 'success') {
          saveLottoNum(res.result.tx_hash);  // db save
        }else{
          // error maybe ...
        }
      }
    }, 1000);
  // "request_key": "0b0ee0ad-62b3-4146-980b-531b3201265d",
  // "expiration_time": 1600011054,
  // "status": "completed",
  // "result": {
  // "tx_hash": "0x82d018556e88b8f8f43dc2c725a683afc204bfd3c17230c41252354980f77fb3",
  // "status": "success"
  // }
  }
  ///////////////////////////////////////////////////////////////////
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
          {/* <button onClick={() => window.open('https://c4ei.net/getLotto/{linkTR}', '_blank')}>transaction log</button> */}
        </section>
        {/* //////////////// */}
        {/* <div className='donate-page'>
          {step === SEND_REQUEST &&
            (<>
              <div className='title'>1KLAY를<br /> 아래 주소로 로또 참여</div>
              <div className='address'>{to}</div>
              <Button onClick={sendPrepareRequest}>KLAY 로또 참여하기</Button>
            </>)}
          {step === SHOW_LOADING && (
            <Spinner />
          )}
          {step === SHOW_RESULT && (
            <div className='result'>
              <img src="https://klipwallet.com/img/home-klip-user-guide-event.png" />
              <div className='message'>
                로또 참여 완료되었습니다!!
              </div>
            </div>
          )}
        </div> */}
        {/* https://lotto.c4ei.net/api/getLotto/0x817b4b495bc86faee85cbb9c404e59471629e004d1d892714b0af19d2e909266 */}
        {/* //////////////// */}
      </main>
    </div>
  );
};

export default App;
