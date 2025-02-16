import axios from "axios";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password, address, phone);
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            address: address,
            phone: phone
        }).then(res => {
            console.log(res);
            toast.success("Registered Successfully");
            navigate("/login");
        }).catch(err => {
            console.log(err);
            toast.error(err?.response?.data?.error||"Something went wrong");
        })
    }
    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <div className="w-[400px] h-[600px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
                <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover" />
                
                <input type="text" placeholder="First Name" className="mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                
                <input type="text" placeholder="Last Name" className="mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                
                <input type="email" placeholder="Email" className="mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <input type="password" placeholder="Password" className="mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <input type="text" placeholder="Address" className="mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={address} onChange={(e) => setAddress(e.target.value)} />
                
                <input type="tel" placeholder="Phone" className="mt-4 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
                
                <button onClick={handleOnSubmit} className="my-6 w-[300px] h-[50px] bg-yellow-500 text-white text-2xl font-bold rounded-lg">Register</button>
            </div>
        </div>
    );
}
