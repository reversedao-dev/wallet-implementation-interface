import { ethers } from 'ethers';
import UAParser from "ua-parser-js";

export async function initWeb3() {
    // pass in the provider useRef
    // add window.ethereum as the current provider
    // return signer
    if (typeof window.ethereum !== undefined || typeof window.web3 !== undefined) {
      const eth = new ethers.providers.Web3Provider(window.ethereum, "any");
      const listAccount = await eth.listAccounts();
      if (listAccount.length > 0) {
        const signer = await eth.getSigner();
        return signer
      } else {
        return undefined
      }
    }
  };
  
export async function getChainId() {
    const eth = new ethers.providers.Web3Provider(window.ethereum, "any");
    const currentChain = await eth.getNetwork();
    return currentChain;
  };


export async function connectWallet() {
    try {
      if (window.ethereum?.isMetaMask) {
        let resp = window.ethereum.request({
          method: "eth_requestAccounts",
          params: [{ eth_accounts: {} }],
        });
        return resp;
      } else if (typeof window.ethereum?.isMetaMask == undefined || !window.ethereum?.isMetaMask ) {
        installMetamask();
      } 
    } catch (err) {
      console.log("Error in connecting wallet", err);
    }
}

function installMetamask() {
  if (typeof window.ethereum !== undefined || !window.ethereum.isMetaMask) {
    try {
      const userAgent = new UAParser();
      const { name } = userAgent.getBrowser();
      let downloadLink;
      switch (name.toUpperCase()) {
        case "SAFARI": //NOT SUPPORT BY METAMASK
        case "CHROME":
          downloadLink =
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
          break;
        case "FIREFOX":
          downloadLink =
            "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
          break;
        default:
        break;
      }
      window.open(downloadLink, "_blank").focus();
    } catch (err) {
      console.log("Error in connecting wallet", err.message);
      return false;
    }
  }
}

export function abbreviateAddress(address) {
  return address.substr(0, 16) + '...' + address.substr(address.length -8, 8);
}

export const customNetworkName = (chainId) => {
  let networkText = chainId;
  switch (chainId) {
    case 1 || "homestead":
      networkText = "Ethereum Mainnet";
      break;
    case 3 || "ropsten":
      networkText = "Ropsten Testnet";
    break;
    case 4 || "rinkeby":
      networkText = "Goerli Testnet";
    break;
    case 5 || "goerli":
      networkText = "Goerli Testnet";
    break;
    case 42 || "kovan":
      networkText = "Kovan Testnet";
    break;
    case 97 || "bnbt":
      networkText = "BSC Testnet";
      break;
    case 56 || "bnb":
      networkText = "Binance Smart Chain Mainnet";
      break;
    case 137 || "matic":
      networkText = "Polygon Mainnet";
      break;
    case 80001 || "mumbai":
      networkText = "Mumbai Testnet";
      break;
    default:
      break;
  }
  return networkText;
};