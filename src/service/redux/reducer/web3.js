import {     
    INIT_WALLET_ADDRESS,
    INIT_CURRENT_CHAIN,
    SET_CURRENT_CHAIN,
    SET_WALLET_ADDRESS,
    SET_WEB3_BUFFERING,
} from '../actionTypes';

const initialState = {
    buffering: true,
	currentSignerAddress: null,
    currentChain: {
        name: null,
        chainId: -1,
        ensAddress: null,
        _defaultProvider: null
    }
};

export default function web3state(state = initialState, action) {
    let data = undefined;
	switch (action.type) {

        case SET_WEB3_BUFFERING:
            data = action.payload;
            return {...state, buffering: data};

		case SET_WALLET_ADDRESS:
            data = action.payload;
			return {...state, currentSignerAddress: data};

        case SET_CURRENT_CHAIN:
            data = action.payload;
            return {...state, currentChain: data}

        case INIT_WALLET_ADDRESS:
            return {...state, currentSignerAddress: undefined};

        case INIT_CURRENT_CHAIN:
            return {
                ...state, 
                currentChain: {
                    name: null,
                    chainId: -1,
                    ensAddress: null,
                    _defaultProvider: null
                }
            };
    
		default:
			return state;
	}
}
