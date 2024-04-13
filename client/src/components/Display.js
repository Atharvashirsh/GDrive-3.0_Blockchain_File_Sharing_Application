import { useState } from "react";
import "./Display.css";
// import axios from "axios";
// import { ethers } from "ethers";
import { convertBytes } from "./helpers";
import moment from "moment";
import RemoveFile from "./RemoveFile";

function isDeleted(arr) {
    // console.log(arr[0], typeof arr[0], arr[0]._hex === "0x00");
    return arr[0]._hex === "0x00";
}

const Display = ({ contract, account }) => {
    // const [data, setData] = useState("");
    // let dataArray;
    // let isEmpty;
    const [dataArray, setDataArray] = useState([]);
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

        // let isEmpty = Object.keys(dataArray).length === 0;

        // console.log(ethers.utils.formatEther(dataArray[0][2]));
        // async function deleteFile(cid) {
        //     // console.log(cid);
        //     // https://api.pinata.cloud/pinning/unpin/{CID}

        //     try {
        //         const apiUrl = `https://api.pinata.cloud/pinning/unpin/${cid}`;

        //         const response = await axios.delete(apiUrl, {
        //             headers: {
        //                 pinata_api_key: `d9a88e1e5711230d4741`,
        //                 pinata_secret_api_key: `5215022e4cf437b95c09d958a6a8d83ea42af670dfe99b015e6992cffe05569d`,
        //             },
        //         });

        //         console.log("File unpin request successful:", response.data);
        //         alert("Successfully removed file");
        //     } catch (error) {
        //         console.error("Error unpinning file:", error);
        //     }
        // }

        // if(isEmpty) {
        //     alert("No image to display");
        //     return
        // }

        // if (!isEmpty) {
        //     console.log(dataArray);
        //     const str = dataArray.toString();
        //     const str_array = str.split(",");
        //     // console.log(str);
        //     // console.log(str_array);

        //     const images = str_array.map((item, i) => {
        //         return (
        //             <div className="item-frame">
        //                 <a href={item} key={i} target="_blank" rel="noreferrer">
        //                     <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="new" className="image-list"></img>
        //                 </a>
        //             </div>
        //         );
        //     });
        //     setData(images);
        // } else {
        //     alert("No image to display");
        // }
    };

    // const dataArray_2 = Array(dataArray);
    // console.log(`Data Array = ${dataArray_2}`);

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
                        {/* <th width="20px">File ID</th> */}
                        <th width="20px">File Name</th>
                        <th width="20px">File Size</th>
                        <th width="20px">File Type</th>
                        <th width="20px">Upload Time</th>
                        <th width="20px">File Hash</th>
                        <th width="20px">Uploaded By</th>
                        <th width="20px">Action</th>
                    </tr>

                    {Object.keys(dataArray).length === 0
                        ? alert("No file to display")
                        : dataArray.map((item, i) => (
                              <>
                                  <tr style={isDeleted(item) ? { display: "none" } : { display: "" }}>
                                      {/* <td width="30px">{Number(item[0]._hex)}</td> */}
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
