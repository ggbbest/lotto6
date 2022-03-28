import "./App.css";
import React, { useState } from "react";
import Header from "./Header";
import Results from "./Results";
import Coupon from "./Coupon";
import ButtonStart from "./ButtonStart";
import Display from "./Display";
import ButtonReset from "./ButtonReset";
import axios from 'axios'; 
///////////////////// metamask s ////////////////
import {useWeb3React} from '@web3-react/core';
import {injected} from './lib/connectors';
///////////////////// metamask e ////////////////
import { useAlert } from 'react-alert'

const dotenv = require('dotenv');
dotenv.config();

const App = () => {
  const alert = useAlert();
  // const mkSel = betChip();
  const numbers = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45
  ];
  const awards = { three: 5, four: 50, five: 5000, six: 3000000 };

  const [playerNumbers, setPlayerNumbers] = useState([]);
  const [drawedNumbers, setDrawedNumbers] = useState([]);
  const [gamesNumber, setGamesNumber] = useState(0);
  const [hits, setHits] = useState(0);
  const [money, setMoney] = useState(0);
  //////////////////////////////////////////////////////
  const selectListChip = ["1", "2", "3", "4", "5", "10", "20", "30", "40", "50", "100", "500", "1000"];
  const [SelectedChip, setSelectedChip] = useState("");
  const handleSelectChip = (e) => { setSelectedChip(e.target.value); };
   //////////////////////////////////////////////////////

  async function sendEthByMeta(send_account,send_amt) {
    // console.log("############ 138 /lotto2/src/App.js "+Header.jsDt.data[0].yyyywkr+"############");
    if(send_amt===undefined||send_amt===""){send_amt=1;}
    let saveData = playerNumbers[0]+" "+playerNumbers[1]+" "+playerNumbers[2]+" "+playerNumbers[3]+" "+playerNumbers[4]+" "+playerNumbers[5];
    // console.log("############ 152 /lotto2/src/App.js "+saveData+":saveData/"+send_account+":send_account/"+send_amt+":send_amt/");

    try {
      var Web3 = require('web3');
      let web3 = new Web3(Web3.curentProvider);
      const params = {
          from: send_account,
          to: '0x286A6CE75d9f623FfbA96fC2175FD5fbE2690746', //klayMain
          value: web3.utils.toWei(send_amt + '', 'ether')
          // gas: 39000,
          ,data:web3.utils.toHex(saveData)
      };
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);
      const sendHash = window.web3.eth.sendTransaction(
        params
        ,function(err , transactionHash){
          if(err){
            console.log("send error");
          }else{
            saveLottoNum(transactionHash , send_amt);
          }
        }
      );
      // console.log('txnHash is ' + sendHash);
    } catch(e) {
        console.log("payment fail!");
        console.log(e);
        // msged(<p>Can't connect MetaMask. Please check MetaMask.</p>);
    }
  }

  function saveLottoNum(tx_hash, send_amt) {
      // console.log("#### App 181 #### saveLottoNum "+ send_amt +" : send_amt /" + chainId+" : chainId / "+(chainId===8217)?"KLAY":"C4EI" +" :coin_name");
      const data = {
        chips: send_amt,
        num1: playerNumbers[0],
        num2: playerNumbers[1],
        num3: playerNumbers[2],
        num4: playerNumbers[3],
        num5: playerNumbers[4],
        num6: playerNumbers[5],
        addr: account,
        chainId : chainId,
        coin_name : (chainId===8217)?"KLAY":"C4EI",
        tx_hash: tx_hash
      };
      // setlinkTR(tx_hash)
      // console.log(response);
      axios.post('https://lotto.c4ei.net/api/setLotto', data)
      .then((res) => {
          // console.log(res.data)
          // response.redirect('/getLotto/'+tx_hash)
          // document.writeln("<script>https://lotto.c4ei.net/lottoNum/"+tx_hash+"</script>")
          document.writeln('<!DOCTYPE html><html lang="en"><head><meta http-equiv="refresh" conten="1;url=https://lotto.c4ei.net/lottoNum/'+tx_hash+'"><title>move</title></head><body><a href="https://lotto.c4ei.net/lottoNum/'+tx_hash+'">'+tx_hash+'</a><SCRIPT LANGUAGE="JavaScript">function Timer() { setTimeout("locateKap()",5000); }function locateKap(){ location.replace("https://lotto.c4ei.net/lottoNum/'+tx_hash+'"); }Timer();</SCRIPT></body></html>')
      }).catch((error) => {
          // console.log(error)
          alert.show('처리되지 않았습니다.문제가 계속 될경우 1분 정도 뒤에 다시 시도해 주십시요.'+error);
          // return;
      });
  }

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

  //yarn add react-alert
  const startDraw = () => {
    if(account===undefined){
      alert.show('Metamask Login First !!!')
      return;
    }
    if (playerNumbers.length === 6) {
      const optionNumbers = [...numbers];
      const drawedNumbers = [];
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * optionNumbers.length);
        drawedNumbers.push(optionNumbers[index]);
        optionNumbers.splice(index, 1);
      }
      sendEthByMeta(account,SelectedChip);
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

///////////////////// metamask s ////////////////
const { chainId, account, active, activate, deactivate } = useWeb3React();
const handleConnect = () => {
  if(active) { deactivate(); return; }
  activate(injected,(error)=>{
    if('/No Ethereum provider was found on window.ethereum/'.test(error)){
      window.open('https://metamask.io/download.html');
    }
  });
}
///////////////////// metamask e ////////////////

/* eslint-disable */
  return (
    <div className="app">
      <Header />
      <main>
        <div>
          <p>Account: <a href={"/myNum/"+account} target="_blank">{account}</a></p>
          <p>ChainId: {chainId}</p>
        </div>
        <div>
          <button type="button" onClick={handleConnect}>{active?'disconnect':'connect'}</button>
        </div>
        <Display drawedNumbers={drawedNumbers} />
        <Coupon numbers={numbers} add={addPlayerNumbers} />
        <div>
        <span>코인수:</span>
        <span>
        <select onChange={handleSelectChip} value={SelectedChip} >
          {selectListChip.map((item) => ( <option value={item} key={item}> {item} </option> ))}
        </select>
          {(chainId===8217)?"KLAY":"C4EI"}
        </span>
        </div>
        <Results games={gamesNumber} hits={hits} money={money} />
        <section className="controls">
          <ButtonStart playerNumbers={playerNumbers} start={startDraw} />
          <ButtonReset reset={resetGame} />
        </section>
      </main>
    </div>
  );
};

export default App;
