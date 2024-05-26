import "./RemoveFile.css";
import axios from "axios";

const RemoveFile = ({ hash, account, contract, owner }) => {
    console.log(`Wallet address from remove.js: ${account}`);
    const removefile = async (e) => {
        e.preventDefault();
        const remove_state = contract.remove(hash, owner);
        console.log("this is remove state", remove_state);
        const apiURL = "https://api.pinata.cloud/pinning/unpin/" + hash;
        const PINATA_JWT_TOKEN =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhY2IwMjY4MC0xNGEzLTRkNTQtYjdlNy0yZWUxZDVhODVjYzQiLCJlbWFpbCI6ImFzdHcyMTIwOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDlhODhlMWU1NzExMjMwZDQ3NDEiLCJzY29wZWRLZXlTZWNyZXQiOiI1MjE1MDIyZTRjZjQzN2I5NWMwOWQ5NThhNmE4ZDgzZWE0MmFmNjcwZGZlOTliMDE1ZTY5OTJjZmZlMDU1NjlkIiwiaWF0IjoxNzEyMTQ2MzQ4fQ.R2E8ue3hLdlCIkHfMMbFJurs1n1IiJUA5Zw2wYFdFlg";
        const headers = { Authorization: `Bearer ${PINATA_JWT_TOKEN}` };

        try {
            await axios.delete(apiURL, { headers });
        } catch (e) {
            alert("File cannot be removed.");
            console.log(e);
        }
    };
    return (
        <>
            <form onSubmit={removefile}>
                <button className="remove" type="submit">
                    Remove
                </button>
            </form>
        </>
    );
};

export default RemoveFile;
