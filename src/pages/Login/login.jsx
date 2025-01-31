import "./login.css";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login(){
        console.log(email, password)
    }

    return (
        <div className="bg-picture w-full h-screen  flex justify-center items-center">
            <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
                <img src="/logo.png " alt="logo" className="w-[100px] h-[100px] object-cover" />

                <input type="email" placeholder="Email" className="mt-6 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={email}
                onChange={(e) => {setEmail(e.target.value)} }/>
                

                <input type="password" placeholder="Password" className="mt-6 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={password}
                onChange={(e) => {setPassword(e.target.value)}}/>
                

                <button className="my-8 w-[300px] h-[50px] bg-yellow-500 text-white text-2xl font-bold rounded-lg" onClick={login}>Login</button>
                
            </div>
        </div>
    );

}