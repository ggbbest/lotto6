//metamask-auth.js
//https://metamask.app.link/dapp/lotto.c4ei.net/lotto2
import React, { useEffect, useState } from "react";
import styles from "./metamask-auth.module.css";

function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(p1 , p2) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });
  const chainid  = await window.ethereum.request({ method: 'eth_chainId' });
  p1(accounts[0]);
  p2(chainid);

  // const chainid = await window.ethereum.request({ method: 'eth_chainId' });
  // setMUserChainid(chainid);
}

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

async function checkIfWalletIsConnected(p1 , p2) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_accounts", });
    const chainid = await window.ethereum.request({ method: 'eth_chainId' });
    // setMUserChainid(chainid);
    if (accounts.length > 0) {
      const account = accounts[0];
      p1(account);
      p2(chainid);
      return;
    }

    if (isMobileDevice()) {
      await connect(p1 , p2);
    }
  }
}

function Connect({ setMUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "lotto.c4ei.net/lotto4"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
         <button className={styles.buttonMeta}>
           Connect to MetaMask
         </button>
      </a>
    );
  }
  return (
    <button className={styles.buttonMeta} onClick={() => connect(setMUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

function Address({ userMAddress }) {
  return (
    <span className={styles.addressMeta}>{userMAddress.substring(0, 5)}…{userMAddress.substring(userMAddress.length - 4)}</span>
  );
}

const MetaMaskAuth = (account, chainId) => {
// export default function MetaMaskAuth({ onAddressChanged }) {
    const [userMAddress, setMUserAddress] = useState("");
    const [userMChainid, setMUserChainid] = useState("");
    useEffect(() => { checkIfWalletIsConnected(setMUserAddress, setMUserChainid); }, []);
    account = userMAddress;
    chainId = parseInt(userMChainid, 16);
    // setaccount(account);
    // setchainId(chainId);
    return userMAddress ? ( 
      <div> 
        <a href={"/myNum/"+userMAddress} target="_blank"> <Address userMAddress={userMAddress} /> </a> [{chainId}] 
      </div> 
    )
    : ( <Connect setMUserAddress={setMUserAddress}/> );
  }
  export default MetaMaskAuth;