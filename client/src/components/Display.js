import { useState, useEffect, useRef } from "react";
import "./Display.css";
import { convertBytes } from "./helpers";
import moment from "moment";
import RemoveFile from "./RemoveFile";

function isDeleted(arr) {
    return arr[0]._hex === "0x00";
}

const Display = ({ contract, account }) => {
    const [dataArray, setDataArray] = useState([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (Object.keys(dataArray).length === 0) {
                alert("No file to display");
            }
        }
        isFirstRender.current = false;
    }, [dataArray]);

    console.log("in Display");
    const getdata = async () => {
        console.log("in get data");
        const Otheraddress = document.querySelector(".address").value;
        let tempdataArray = [];
        try {
            if (Otheraddress) {
                tempdataArray = await contract.display(Otheraddress);
                console.log(tempdataArray);
            } else {
                tempdataArray = await contract.display(account);
                console.log(tempdataArray);
            }
            setDataArray(tempdataArray);
        } catch (e) {
            alert("You don't have access");
        }
    };

    console.log(`Wallet address from display.js: ${account}`);
    return (
        <>
            <div className="getfile">
                <div className="getfile-h1">
                    <h1> Fetch data </h1>
                </div>
                <div className="addr">
                    <input type="text" placeholder="Enter Address" className="address"></input>
                    <button className="databutton" onClick={getdata}>
                        Get Data
                    </button>
                </div>
            </div>

            <table class="rwd-table">
                <tbody>
                    <tr>
                        <th width="20px">File Name</th>
                        <th width="20px">File Size</th>
                        <th width="20px">File Type</th>
                        <th width="20px">Upload Time</th>
                        <th width="20px">File Hash</th>
                        <th width="20px">Uploaded By</th>
                        <th width="20px">Action</th>
                    </tr>

                    {Object.keys(dataArray).length !== 0
                        ? {}
                        : dataArray.map((item, i) => (
                              <>
                                  <tr style={isDeleted(item) ? { display: "none" } : { display: "" }}>
                                      <td>{item[1]}</td>
                                      <td>{convertBytes(Number(item[2]._hex))}</td>
                                      <td>{item[3]}</td>
                                      <td>{moment.unix(Number(item[4]._hex)).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                      <td>
                                          {item[5].substring(0, 6)}..........{item[5].substring(40)}
                                      </td>
                                      <td>
                                          {item[6].substring(0, 6)}..........{item[6].substring(38)}
                                      </td>
                                      <td className="action ">
                                          <a href={`https://gateway.pinata.cloud/ipfs/${item[5]}`} target="_blank" rel="noreferrer">
                                              <button>Visit</button>
                                          </a>
                                          <RemoveFile hash={item[5]} account={account} contract={contract} owner={item[6]} />
                                      </td>
                                  </tr>
                              </>
                          ))}
                </tbody>
            </table>
        </>
    );
};
export default Display;
