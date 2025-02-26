import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

// export default function Testing() {
//     const [count, setCount] = useState(0);
//     const [itemName, setItemName] = useState("Coconut");
//     return (
//         <div className="w-full h-screen bg-red-900 flex flex-col justify-center items-center">
//             <h1 className="text-[100px]">{count}{itemName}s</h1>
//             <button className="w-[200px] h-[60px] bg-black text-900 text-3xl text-white rounded-lg" onClick={() => {
//                 const newCount = count + 1;
//                 setCount(newCount);
//             }}>Count</button>

//             <div className="w-full flex justify-evenly items-center p-4">

//                 <button className="w-[200px] h-[60px] bg-black text-900 text-3xl text-white rounded-lg" onClick={() => setItemName("Coconut")}>Coconut</button>

//                 <button className="w-[200px] h-[60px] bg-black text-900 text-3xl text-white rounded-lg" onClick={() => setItemName("Banana")}>Banana</button>

//                 <button className="w-[200px] h-[60px] bg-black text-900 text-3xl text-white rounded-lg" onClick={() => setItemName("Apple")}>Apple</button>

//                 <button className="w-[200px] h-[60px] bg-black text-900 text-3xl text-white rounded-lg" onClick={() => setItemName("Other")}>Other</button>

//             </div>
//         </div>
//     );
// }

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