import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";

import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import Storage from "./components/storage/storage";
import History from "./components/history/history";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";

export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
    const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
    const [network, setNetwork] = useState(null);               // network the account is using. 
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

    const [givePending, setGivePending] = useState(false); // check if value in process of being stored
    const [giveDone, setGiveDone] = useState(false);    // check if value done being stored
    const [showVal, setShowVal] = useState(0);                  // value that is showed on screen. 
    const [GiveDegreeSuccess, setGiveDegreeSuccess] = useState(0)

    const [historyRecord, setHistoryRecord] = useState(null);   // record of history operations. 
    const [recordLen, setRecordLen] = useState(0);              // length of record. 
    const maxRecordLen = 50;                                    // maximum length of record list. 

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
        // const res = await contract.methods.issueCertificate(studentAddress, courseName, issueDate).call();
        const res = await contract.methods.issueCertificate(studentAddress, courseName, issueDate).send({from: address});
        return res;
    }

////// history recording. 
const RecordOverFlow = () => {
    if (recordLen > maxRecordLen){
        let outlierNum = recordLen - maxRecordLen;
        setHistoryRecord(current => current.splice(1, outlierNum));
        setRecordLen(maxRecordLen);
    }
}

const RecordPush = (opr, val, detail) => {
    let stat = 1;
    let cost = 0;
    if (val.length === 0){
        val = 'NA';
        cost = 'NA';
        stat = 0;
    }
    else{
        if (opr === 'get'){
            cost = 0;
            stat = 1;
        }
        else{
            if (detail === 'null'){
                setGivePending(false);
                setGiveDone(true);
                console.log('Rejected');
                cost = 'NA';
                stat = 2;
            }
            else{
                setGiveDone(true);
                console.log('Done');
                console.log(detail);    // show the details of transaction. 
                cost = detail.gasUsed;
                stat = 1;
            }
        }
    }

    const newRecord = {
        id: recordLen + 1, 
        address: address, 
        operation: opr, 
        value: val, 
        cost: cost, 
        status: stat
    };
    if (recordLen === 0){
        setHistoryRecord([newRecord, newRecord]);
    }
    else{
        setHistoryRecord(current => [...current, newRecord]);
    }
    setRecordLen(recordLen + 1);

    if (recordLen > maxRecordLen){
        RecordOverFlow();
    }
}

////// store and get value. 
    const getCertificateData = async () => {
        const inputAddress = document.getElementById('inputAddress').value;

        if (inputAddress.length === 0) {
            const detail = 'null';
            RecordPush('get', inputAddress, detail)
        }
        else {
            try{
                const detail = await getCertificate(inputAddress);   // retrieve student info
                setGivePending(false);
                setGiveDone(false);
                setShowVal(detail)
                RecordPush('get', inputAddress, detail)

            }
            catch(err){
                const detail = 'null';                      // no detail info. 
                RecordPush('get', inputAddress, detail)
            }
        }
    }

    const giveCertificate = async () => {
        const receiverAddress = document.getElementById('receiverAddress').value;
        const receiverCourse = document.getElementById('receiverCourse').value;
        const receiverIssueYear = document.getElementById('receiverIssueYear').value;
        setGivePending(false);
        setGiveDone(false);

        if (receiverAddress.length === 0 || receiverCourse.length === 0 || receiverIssueYear.length === 0) {
            const detail = 'null';
            RecordPush('store', receiverAddress, detail)
        }
        else {
            setGivePending(true);
            try{
                const detail = await makeCertificate(receiverAddress, receiverCourse, receiverIssueYear);   // contract deployed. 
                console.log(detail)
                setGiveDegreeSuccess(detail)
                RecordPush('store', receiverAddress, detail)

            }
            catch(err){
                const detail = 'null';                      // no detail info. 
                RecordPush('store', receiverAddress, detail)
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
                giveCertificateHandle = {giveCertificate}
                showVal = {showVal}
                GiveDegreeSuccess = {GiveDegreeSuccess}
                givePending = {givePending}
                giveDone = {giveDone}
            />
        )
    }

    const HistoryDisplay = () => {
        return (
            <History 
                isConnected = {isConnected}
                recordList = {historyRecord}
                recordLen = {recordLen}
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
                    <Route path = "/InterfaceDemo/history" element = {<HistoryDisplay/>}></Route>
                </Routes>
            </div>
        // </BrowserRouter>
    );
}

