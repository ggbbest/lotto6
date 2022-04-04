//metamask-auth.js
//https://metamask.app.link/dapp/lotto.c4ei.net/lotto2
import React, { useEffect, useState } from "react";
import styles from "./metamask-auth.module.css";

function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });
  onConnected(accounts[0]);

  // const chainid = await window.ethereum.request({ method: 'eth_chainId' });
  // setUserChainid(chainid);
}

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_accounts", });
    const chainid = await window.ethereum.request({ method: 'eth_chainId' });
    // setUserChainid(chainid);
    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "lotto.c4ei.net/lotto2"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
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
    <button className={styles.buttonMeta} onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

function Address({ userAddress }) {
  return (
    <span className={styles.addressMeta}>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}

const MetaMaskAuth = (address) => {
// export default function MetaMaskAuth({ onAddressChanged }) {
    const [userAddress, setUserAddress] = useState("");
    const [userChainid, setUserChainid] = useState("");
    useEffect(() => { checkIfWalletIsConnected(setUserAddress); }, []);
    // useEffect(() => { onAddressChanged(userAddress); }, [userAddress]);
    // useEffect(() => { }, [userAddress]);
    // chainid = {userAddress};
    // address = {userAddress};
    // handleChainChanged(chainId);
    // window.ethereum.on('chainChanged', handleChainChanged);

    // userChainid = {userAddress};
    return userAddress ? ( <div> Connected with <Address userAddress={userAddress} /> </div> ) : ( <Connect setUserAddress={setUserAddress}/> );
  }
  export default MetaMaskAuth;