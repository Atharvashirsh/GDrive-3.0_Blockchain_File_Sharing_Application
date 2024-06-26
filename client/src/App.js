import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
// require("dotenv").config();

function App() {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const loadProvider = async () => {
            if (provider) {
                window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                });

                window.ethereum.on("accountsChanged", () => {
                    window.location.reload();
                });
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

                const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
                //console.log(contract);
                setContract(contract);
                setProvider(provider);
            } else {
                console.error("Metamask is not installed");
            }
        };
        provider && loadProvider();
    }, []);
    return (
        <>
            <div className="App">
                <div className="logo">
                    <h1>Drive 3.0</h1>
                </div>

                <div className="account">
                    <p>Account : {account ? account : "Not connected"}</p>
                </div>

                {!modalOpen && (
                    <button className="share" onClick={() => setModalOpen(true)}>
                        <span class="label">Share</span>
                    </button>
                )}
                {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract}></Modal>}
                <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
                <Display contract={contract} account={account}></Display>
                {console.log(`Wallet address from app.js: ${account}`)}
            </div>
        </>
    );
}

export default App;
