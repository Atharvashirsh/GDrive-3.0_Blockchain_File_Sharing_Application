import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        setModalOpen(false);
    };
    const revoking = async () => {
        const address = document.querySelector(".address").value;
        await contract.disallow(address);
        setModalOpen(false);
    };
    useEffect(() => {
        const accessList = async () => {
            const addressList = await contract.shareAccess();
            console.log(addressList);
            let select = document.querySelector("#selectNumber");
            const options = addressList;

            for (let i = 0; i < options.length; i++) {
                if (options[i][1] === true) {
                    let opt = options[i][0];
                    let e1 = document.createElement("option");
                    e1.textContent = opt;
                    e1.value = opt;
                    select.appendChild(e1);
                }
            }
        };
        contract && accessList();
    }, [contract]);
    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        Share with
                        <button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            className="titleCloseBtn"
                        >
                            X
                        </button>
                    </div>
                    <div className="body">
                        <input type="text" className="address" placeholder="Enter Address"></input>
                    </div>
                    <form id="myForm">
                        <select id="selectNumber">
                            <option className="accesslist">People With Access</option>
                        </select>
                    </form>
                    <div className="footer">
                        <button onClick={() => revoking()} id="revoke">
                            Revoke access
                        </button>
                        <button onClick={() => sharing()}>Share Files</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal;
