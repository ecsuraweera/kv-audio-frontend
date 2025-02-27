import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function Testing() {
    const [file, setFile] = useState(null);

    function uploadFile() {
        console.log(file);
        mediaUpload(file).then((url)=>{
            console.log(url);
        })
    }

    return (

        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input type= "file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <button onClick={uploadFile} className="w-[200px] h-[60px] bg-black text-900 text-3xl text-white rounded-lg">Upload</button>
        </div>

    );
}