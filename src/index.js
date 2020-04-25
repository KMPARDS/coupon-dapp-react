import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const ethers = require('ethers');
const { network, esContract, couponDappContract } = require('./config');

window.provider = ethers.getDefaultProvider(network);

window.updateContractInstances = () => {
  window.esInstance = new ethers.Contract(
    esContract.address,
    esContract.abi,
    window.wallet || window.provider
  );

  window.couponDappInstance = new ethers.Contract(
    couponDappContract.address,
    couponDappContract.abi,
    window.wallet || window.provider
  );
};

const processParentMessage = (message) => {
  if (message.substring) {
    if (message.substring(0, 2) === '0x') {
      window.wallet = new ethers.Wallet(message).connect(window.provider);
      window.updateContractInstances();
    }
  }
};

if (process.env.REACT_APP_DEV_WALLET_PRIVATE_KEY) {
  processParentMessage(process.env.REACT_APP_DEV_WALLET_PRIVATE_KEY);
}

window.onload = function () {
  !window.opener || window.opener.postMessage('loaded', '*');
};

window.addEventListener(
  'message',
  function (e) {
    setTimeout(() => {
      processParentMessage(e.data);
    }, 0);
  },
  false
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
