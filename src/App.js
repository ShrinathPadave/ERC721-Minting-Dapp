import './App.css';
import mintExampleAbi from "./mintExampleAbi.json";
import { ethers, BigNumber, Contract } from 'ethers';
import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
function App() {

  const [accounts, setAccounts] = useState([]);

  async function connectAccount() {
    if (window.ethereum) {

      const accounts = await window.ethereum.request(
        {
          method: "eth_requestAccounts"
        }
      );
      setAccounts(accounts);
    }
  }


  useEffect(() => {
    connectAccount();
  }, []);

  //Minting
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response", response);
      }
      catch (err) {
        console.log("error", err);
      }
    }
  }

  return (


    <div className="App">

<h1> Web3 Minting Dapp</h1>

<div class="container">
<h4>Select the amount of TOKENS</h4> 
      {   accounts.length && (
          <div>
            <button className="btn btn-danger" onClick={()=>setMintAmount(mintAmount-1)}>-</button>
            <br/>
            {mintAmount}
            <br/>
            <button className="btn btn-success" onClick={()=>setMintAmount(mintAmount+1)}>+</button>
            <br/>
            <br/>
            <button class="btn btn-primary" onClick={handleMint}>MINT</button>
          </div>
        )}
</div>

    </div>
  );
}

export default App;
