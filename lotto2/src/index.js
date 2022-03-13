import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import App from "./App";

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  return library;
}

const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <StrictMode>
//     <Web3ReactProvider getLibrary={getLibrary}>
//       <App />
//     </Web3ReactProvider>
//   </StrictMode>,
//   rootElement
// );


ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  rootElement
  // document.getElementById("root")
);
