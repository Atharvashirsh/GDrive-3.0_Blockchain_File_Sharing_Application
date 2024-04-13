import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
    // console.log(process.env.PINATA_API_KEY);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No File selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `d9a88e1e5711230d4741`,
                        pinata_secret_api_key: `5215022e4cf437b95c09d958a6a8d83ea42af670dfe99b015e6992cffe05569d`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                // const fileURL = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.add(account, file.size, file.type, file.name, resFile.data.IpfsHash);
                console.log(file);
                alert("Successfully File Uploaded");
                setFileName("No File selected");
                setFile(null);
            } catch (e) {
                alert("Unable to upload file to Pinata");
            }
        }
        alert("Successfully File Uploaded");
        setFileName("No File selected");
        setFile(null);
    };
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    Choose File
                </label>
                <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
                <span className="textArea">Filename: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};
export default FileUpload;
