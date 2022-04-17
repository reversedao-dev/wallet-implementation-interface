import React, { Fragment } from 'react';
import { WalletButton } from './Button';
import { Header } from './Header';
import { connect } from 'react-redux';
import { setCurrentChain, setCurrentSignerAddress, setWeb3Buffering } from '../service/redux/actions';
import { abbreviateAddress, connectWallet, customNetworkName } from './utils/Web3Context/erc.utils';

function MetaMaskConnectionButton(props) {
    const { web3state } = props;
    const { buffering, currentChain, currentSignerAddress} = web3state;
    
    const handleWalletConnect = async (e) => {
        e.preventDefault();
        try{
            await connectWallet()
          } catch(err){
            console.log('Error in connecting wallet', err)
          }
    }
      
    return (
        <React.Fragment>
          {!buffering &&
            <div className="MastamaskConnectionRoot">
                <Header />
                {currentSignerAddress ? (
                    <Fragment>
                        <p className="no-margin">{customNetworkName(currentChain.chainId)}</p>
                        <p>{abbreviateAddress(currentSignerAddress)}</p>
                        <WalletButton currentSignerAddress={currentSignerAddress} className="connectionButton" type="connection" text="Connected" disabled={true}/>
                    </Fragment>
                ) : (
                    <Fragment>
                        <WalletButton className="normalButton" type="test" onClick={handleWalletConnect} text="Connect to Wallet"/>
                    </Fragment>
                )}
          </div>
          }
        </React.Fragment>
    );
}    

const mapStateToProps = (state) => {
    const { web3state } = state;
    return { web3state };
};

export default connect(mapStateToProps, { setCurrentChain, setCurrentSignerAddress, setWeb3Buffering})(MetaMaskConnectionButton);