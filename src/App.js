import MetaMaskConnectionButton from './components/MetaMaskConnectionButton';
import Web3GlobalProvider from './components/utils/Web3Context/provider';
import './App.css';

const App = () => {
  return (
      <div className="App">
         <Web3GlobalProvider>
            <header className="App-header">
                <MetaMaskConnectionButton/>
            </header>
          </Web3GlobalProvider>
      </div>
  );
}

export default App;
