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

const App = () => {
  // const alert2 = useAlert();
  const numbers = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45
  ];
  
  const [playerNumbers, setPlayerNumbers] = useState([]);
  const [drawedNumbers, setDrawedNumbers] = useState([]);
  const [gamesNumber, setGamesNumber] = useState(0);
  const [hits, setHits] = useState(0);
  const [money, setMoney] = useState(0);
  //////////////////////////////////////////////////////
  const selectListChip = ["0.001","1", "2", "3", "4", "5", "10", "20", "30", "40", "50", "100", "500", "1000"];
  const [SelectedChip, setSelectedChip] = useState("");
  const onchg_SelectChip = (e) => { setSelectedChip(e.target.value); };

  const selectListCoinName = ["KLAY", "KSP"];
  const [SelectedCoinName, setSelectedCoinName] = useState("");
  const onchg_SelectCoinName = (e) => { setSelectedCoinName(e.target.value); };
  const [userAddress, setuserAddress] = useState("");
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

  //////////////////////////////////////////////////////
  const bappName = 'lotto.c4ei.net'
  const successLink = 'https://lotto.c4ei.net/klipSuccess'
  const failLink = 'https://lotto.c4ei.net/klipFail'
  let loginActive=false;
  const actLogin = async () => {
    if(!loginActive)
    { 
      try {
        const { request_key } = await prepare.auth({bappName, successLink, failLink});
        // await getKlipdata(request_key);
        getKlipdata(request_key);
        // if (res.status === 'completed') {setuserAddress(res.data.klaytn_address);}
        console.log("68 line : getKlipdata ");
      } catch (e) {
        alert('e :' + e);
      }
    }else{
      setuserAddress("");
      loginActive = false;
    }
  }

  async function getKlipdata(request_key){
    alert('79 request_key :' + request_key );
    axios.get( `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
      .then((res) => {
        if (res.data.result) {
          alert(` 83 [Result] ${JSON.stringify(res.data.result)}`);
          // console.log(`[Result] ${JSON.stringify(res.data.result)}`);
        }else{
          alert('86 no data ')
        }
      }).catch((error) => {
        alert('89 error :'+error)
      });
    // const getKlipdata = await getResult(request_key);
    // if (getKlipdata.status === 'completed') {
    //   setuserAddress(getKlipdata.data.klaytn_address);
    //   loginActive = true;
    //   alert('res 79 :' + getKlipdata.data.klaytn_address);
    // }else{
    //   alert('res 81 :no data ');
    // }
  }
  
  const sendPrepareRequest = async (send_account, send_amt, send_coinname) => {
    if(send_amt===undefined||send_amt===""){send_amt=1;}
    if(send_coinname===undefined||send_coinname===""){send_coinname="KLAY";}
    const KSP_tokenAddress = "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654"; //KSP
    const rcvAddr = '0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e';
    alert('sendPrepareRequest 87 send_account :'+send_account+', send_amt:'+send_amt+', send_coinname:'+send_coinname+'');
    if(send_coinname==="KLAY"){
      const data = await  prepare.sendKLAY({ bappName, send_account, rcvAddr, send_amt });
      if (data.request_key) {
        setStep(SHOW_LOADING)
        request(data.request_key)
        startPollingResult(data.request_key, send_amt , send_coinname )
      }
    }
    if(send_coinname==="KSP"){
      const data = await prepare.sendToken({ bappName, send_account, rcvAddr, send_amt, KSP_tokenAddress });
      if (data.request_key) {
        setStep(SHOW_LOADING)
        request(data.request_key)
        startPollingResult(data.request_key, send_amt , send_coinname )
      }
    }
  }
  
  function saveLottoNum(tx_hash, send_amt, send_coinname) {
      // console.log("#### App 181 #### saveLottoNum "+ send_amt +" : send_amt /" + chainId+" : chainId / "+(chainId===8217)?"CEIK":"BCK" +" :coin_name");
      const data = {
        chips: send_amt,
        num1: playerNumbers[0],
        num2: playerNumbers[1],
        num3: playerNumbers[2],
        num4: playerNumbers[3],
        num5: playerNumbers[4],
        num6: playerNumbers[5],
        addr: userAddress,
        chainId : 8217,
        coin_name : send_coinname,
        tx_hash: tx_hash
      };
      // setlinkTR(tx_hash)
      // console.log(response);
      axios.post('https://lotto.c4ei.net/api/setLotto', data)
      .then((res) => {
          document.writeln('<!DOCTYPE html><html lang="en"><head><meta http-equiv="refresh" conten="1;url=https://lotto.c4ei.net/lottoNum/'+tx_hash+'"><title>move</title></head><body><a href="https://lotto.c4ei.net/lottoNum/'+tx_hash+'">'+tx_hash+'</a><SCRIPT LANGUAGE="JavaScript">function Timer() { setTimeout("locateKap()",5000); }function locateKap(){ location.replace("https://lotto.c4ei.net/lottoNum/'+tx_hash+'"); }Timer();</SCRIPT></body></html>')
      }).catch((error) => {
          // console.log(error)
      });
  }
  //////////////////////////////////////////////////////

  const startDraw = () => {
    // if(userAddress==''){
    //   alert("Klip Login First !!!");
    //   return;
    // }
    if (playerNumbers.length === 6) {
      const optionNumbers = [...numbers];
      const drawedNumbers = [];
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * optionNumbers.length);
        drawedNumbers.push(optionNumbers[index]);
        optionNumbers.splice(index, 1);
      }
      sendPrepareRequest(userAddress,SelectedChip,SelectedCoinName);
      // sendEthByMeta(userAddress,SelectedChip,SelectedCoinName);
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

  const startPollingResult = (requestKey, send_amt , send_coinname) => {
    const id = setInterval(async () => {
      const res = await getResult(requestKey)
      if (res.status === 'completed') {
        clearTimeout(id)
        setStep(SHOW_RESULT)
        if (res.result.status === 'success') {
          saveLottoNum(res.result.tx_hash, send_amt , send_coinname);
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
        <div>
          <p>Account: <a href={"/myNum/"+userAddress} target="_blank">{userAddress}</a></p>
        </div>
        <div>
          <button type="button" onClick={actLogin}>{loginActive?'disconnect':'connect'}</button>
        </div>
        <Display drawedNumbers={drawedNumbers} />
        <Coupon numbers={numbers} add={addPlayerNumbers} />
        <div>
        <span> 코인수:</span>
        <span>
          <select onChange={onchg_SelectChip} value={SelectedChip} >
            {selectListChip.map((item) => ( <option value={item} key={item}> {item} </option> ))}
          </select>
          
          <select onChange={onchg_SelectCoinName} value={SelectedCoinName} >
            {selectListCoinName.map((item) => ( <option value={item} key={item}> {item} </option> ))}
          </select>
        </span>
        </div>
        <Results games={gamesNumber} hits={hits} money={money} />
        <section className="controls">
          <ButtonStart playerNumbers={playerNumbers} start={startDraw} />
          <ButtonReset reset={resetGame} />
          {/* <button onClick={() => window.open('https://c4ei.net/getLotto/{linkTR}', '_blank')}>transaction log</button> */}
        </section>
        {/* //////////////// */}
        {/* <div className='donate-page'>
          {step === SEND_REQUEST &&
            (<>
              <div className='title'>1KLAY를<br />  로또 참여</div>
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
