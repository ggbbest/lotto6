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
// import detectEthereumProvider from '@metamask/detect-provider'
///////////////////// metamask e ////////////////
// import {ethTX} from 'ethereumjs-tx'; //yarn remove ethereumjs-tx
//yarn add web3
import { useAlert } from 'react-alert'
// import { json } from "express/lib/response";
//yarn remove reactjs-popup
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// export default () => (
//   <Popup trigger={<button> Trigger</button>} position="right center">
//     <div>Popup content here !!</div>
//   </Popup>
// );

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
    // ,46,47,48,49,
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
  // setSelectedChip("1");
   //////////////////////////////////////////////////////
  
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
  
  function strtodec(amount, dec){
    var i = 0;
    if (amount.toString().indexOf('.') != -1) {
        i = amount.toString().length - (amount.toString().indexOf('.') + 1);
    }
    let stringf = amount.toString().split('.').join('');
    if (dec<i){
        console.warn("strtodec: amount was truncated");
        stringf = stringf.substring(0,stringf.length - (i-dec));
    } else {
        stringf = stringf + "0".repeat(dec-i);
    }
    return stringf;
  }

  async function sendEthByMeta(send_account,send_amt) {
    if(send_amt===undefined||send_amt===""){send_amt=1;}
    let saveData = playerNumbers[0]+" "+playerNumbers[1]+" "+playerNumbers[2]+" "+playerNumbers[3]+" "+playerNumbers[4]+" "+playerNumbers[5];
    console.log("############ 152 /lotto2/src/App.js "+saveData+":saveData/"+send_account+":send_account/"+send_amt+":send_amt/");
    try {
      var Web3 = require('web3');
      let web3 = new Web3(Web3.curentProvider);
      console.log("#### App 121 #### sendEthByMeta ");      
      // yarn add caver-js // yarn remove caver-js // const Caver = require('caver-js')
      // const caver = new Caver(window.ethereum); //new Caver(process.env.CEIK_RPC)
      await window.ethereum.enable();
      // window.web3 = new Caver(window.ethereum);

      const ceik_contract_abi = require("./ceikABI.json");
      const ceik_tokenAddress = "0x18814b01b5cc76f7043e10fd268cc4364df47da0"; // ceik
      const receiverAddress   = "0x286A6CE75d9f623FfbA96fC2175FD5fbE2690746"; //klayMain
      let sendCEIK = strtodec(send_amt,8); // CEIK decimal 8 
      console.log("#### App 131 #### sendEthByMeta ");      
      // const TokenInstance = new caver.klay.Contract(ceik_contract_abi, ceik_tokenAddress)
      const TokenInstance = new web3.eth.Contract(ceik_contract_abi, ceik_tokenAddress);
      TokenInstance.methods.transfer(receiverAddress, sendCEIK
        ).send({from: send_account, gas: 100000, data:web3.utils.toHex(saveData)}
        ).then(function(receipt){
          console.log("#### App 137 #### sendEthByMeta ");      
          saveLottoNum(receipt.transactionHash , send_amt);
          console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);
        })
      // .on('transactionHash', (hash) => { console.log("### transactionHash ###"); console.log(hash);})
      // .once('receipt', (receipt) => {console.log("blockNumber " + receipt.blockNumber + " / contractAddress" + receipt.contractAddress + " / blockHash" + receipt.blockHash + " / transactionHash" + receipt.transactionHash);})
      // .on('confirmation', (confirmationNumber, receipt) => { console.log("### confirmation ###" + confirmationNumber);})
      // .on('error', console.error)
      ;
    } catch(e) {
        console.log("payment fail!");
        console.log(e);
        // msged(<p>Can't connect MetaMask. Please check MetaMask.</p>);
    }
  }

  function saveLottoNum(tx_hash, send_amt) {
      console.log("#### App 181 #### saveLottoNum "+ send_amt +" : send_amt /" + chainId+" : chainId");
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
        coin_name : "CEIK",
        tx_hash: tx_hash
      };
      // setlinkTR(tx_hash)
      // console.log(response);
      axios.post('https://lotto.c4ei.net/api/setLotto', data)
      .then((res) => {
          console.log(res.data)
          // response.redirect('/getLotto/'+tx_hash)
          // document.writeln("<script>https://lotto.c4ei.net/lottoNum/"+tx_hash+"</script>")
          document.writeln('<!DOCTYPE html><html lang="en"><head><meta http-equiv="refresh" conten="1;url=https://lotto.c4ei.net/lottoNum/'+tx_hash+'"><title>move</title></head><body><a href="https://lotto.c4ei.net/lottoNum/'+tx_hash+'">'+tx_hash+'</a><SCRIPT LANGUAGE="JavaScript">function Timer() { setTimeout("locateKap()",5000); }function locateKap(){ location.replace("https://lotto.c4ei.net/lottoNum/'+tx_hash+'"); }Timer();</SCRIPT></body></html>')
      }).catch((error) => {
          console.log(error)
      });
  }
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
          <p>Account: {account}</p>
          <p>ChainId: {chainId}</p>
        </div>
        <div>
          <button type="button" onClick={handleConnect}>{active?'disconnect':'connect'}</button>
        </div>
        <Display drawedNumbers={drawedNumbers} />
        <Coupon numbers={numbers} add={addPlayerNumbers} />
        <div>
        <span>베팅 코인수:</span>
        <span>
        <select onChange={handleSelectChip} value={SelectedChip} >
          {selectListChip.map((item) => ( <option value={item} key={item}> {item} </option> ))}
        </select>
          {(chainId=="8217")?"CEIK":"C4EI"}
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