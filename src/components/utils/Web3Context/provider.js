import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentChain, setCurrentSignerAddress, setWeb3Buffering } from "../../../service/redux/actions"
import { getChainId, initWeb3 } from './erc.utils';

function Web3GlobalProvider(props) {

    const { children, web3state, setCurrentChain, setCurrentSignerAddress, setWeb3Buffering } = props;

    useEffect(() => {
        async function callback(){
            if (typeof window !== undefined) {
                if (typeof window.ethereum !== undefined || typeof window.web3 !== undefined) {
                    const signer = await initWeb3();
                    if (signer) {
                        setCurrentSignerAddress(await signer.getAddress())
                    }
    
                    if (web3state.currentChain.chainId === -1) {
                        await updateNetwork();
                    };
    
                    window.ethereum.on("chainChanged", async (_chainId) => {
                        console.log('listening to chainChanged event', _chainId);
                        setWeb3Buffering(true);
                        await updateNetwork();
                    })
                    window.ethereum.on('accountsChanged', (acc) => {
                        console.log('listening to accountsChanged event', acc)
                        setWeb3Buffering(true);
                        updateWalletAddress(acc);
                    })
                } else {
                    console.log('metamask is not installed');
                    setCurrentChain({chainId: -2});
                    setWeb3Buffering(false);
                }
            }
        }
        callback();

        return () => {
            window?.ethereum?.removeAllListeners();
        }
    }, [web3state.currentChain.chainId]);

    const updateNetwork = async () => {
        const _chain = await getChainId();
        setCurrentChain(_chain);
        setWeb3Buffering(false);
    };

    const updateWalletAddress = async (acc) => {
        console.log(`updated wallet addr`, acc)

        if (acc.length > 0) {
            setCurrentSignerAddress(acc[0]);
            updateNetwork();
        } else {
            setCurrentSignerAddress("");
            setWeb3Buffering(false);
        }
    };

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
};

const mapStateToProps = (state) => {
    const { web3state } = state;
    return {
        web3state
    };
};

export default connect(
    mapStateToProps,
    { setCurrentSignerAddress, setCurrentChain, setWeb3Buffering }
)(Web3GlobalProvider);
