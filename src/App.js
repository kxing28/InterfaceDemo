import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";

import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import Storage from "./components/storage/storage";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";

export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
    const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
    const [network, setNetwork] = useState(null);               // network the account is using. 
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

    const [storedVal, setStoredVal] = useState(0);              // value that is stored right now. 
    const [showVal, setShowVal] = useState(0);                  // value that is showed on screen. 

    const navigate = useNavigate();
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

////// connect to MetaMask. 
    const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'. 
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balanceVal);

            console.log(chainId);
            if (chainId === '0x3'){
                setNetwork('Ropsten Test Network');
            }
            else if (chainId === '0x5'){
                setNetwork('Goerli Test Network');
            }
            else if (chainId === '0xaa36a7'){
                setNetwork('Sepolia Test Network');
            }
            else {
                setNetwork('Other Test Network');
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);

            navigate('/InterfaceDemo/profile');
        }
        catch (error){
            setIsConnected(false);
        }
    }


////// Contract Deployment. 
    // IMPORTANT: async / await is essential to get values instead of Promise. 
    const getCertificate = async (studentAddress) => {
        const res = await contract.methods.verifyCertificate(studentAddress).call();
        return res;
    }

    const makeCertificate = async (studentAddress, courseName, issueDate) => {
        const res = await contract.methods.issueCertificate(studentAddress, courseName, issueDate).call();
        return res;
    }

////// store and get value. 
    const getCertificateData = async () => {
        const inputVal = document.getElementById('inputVal').value;

        if (inputVal.length === 0) {
            const detail = 'null';
        }
        else {         
            try{
                const detail = await getCertificate(inputVal);   // contract deployed. 
                setShowVal(detail)

            }
            catch(err){
                const detail = 'null';                      // no detail info. 
            }
        }
    }


////// display functions. 
    const ProfileDisplay = () => {
        return (
            <Profile 
                isConnected = {isConnected}
                address = {address} 
                networkType = {network} 
                balance = {balance}
            />
        )
    }

    const StorageDisplay = () => {
        return (
            <Storage 
                isConnected = {isConnected}
                getCertificateHandle = {getCertificateData} 
                showVal = {showVal} 
            />
        )
    }

    return (
        // <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/InterfaceDemo" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />}></Route>
                    <Route path = "/InterfaceDemo/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/InterfaceDemo/storage" element = {<StorageDisplay/>}></Route>
                </Routes>
            </div>
        // </BrowserRouter>
    );
}

