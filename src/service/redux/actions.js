import {
    INIT_WALLET_ADDRESS,
    INIT_CURRENT_CHAIN,
    SET_WEB3_BUFFERING,
    SET_WALLET_ADDRESS,
    SET_CURRENT_CHAIN,
  } from "./actionTypes";

  export const setWeb3Buffering = payload => ({
    type: SET_WEB3_BUFFERING,
    payload: payload
  })
  
  export const setCurrentSignerAddress = payload => ({
    type: SET_WALLET_ADDRESS,
    payload: payload,
  });
  
  export const setCurrentChain = payload => ({
    type: SET_CURRENT_CHAIN,
    payload: payload,
  })
  
  export const initWalletAddress = payload => ({
    type: INIT_WALLET_ADDRESS,
    payload: null,
  });
  
  export const initCurrentChain = payload => ({
    type: INIT_CURRENT_CHAIN,
    payload: null,
  });
  
