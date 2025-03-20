import { GoGraph } from "react-icons/go";
import { MdOutlineSpeaker, MdSupervisedUserCircle } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Routes, Route, Link } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminPage() {

    const [userValidated, setUserValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            window.location.href = "/login";
            return;
        }
    
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res.data);
                const user = res.data;
                if (user.role === "admin") {
                    setUserValidated(true); 
                    
                }else{
                    window.location.href = "/";
                }
                
            })
            .catch((err) => {
                console.error(err);
                setUserValidated(false);
            });
    
    }, []);
    

    return (
     <div className="w-full h-screen flex">

        <div className="w-[200px] h-full bg-gray-200">  

            <Link to="/admin/dashboard" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <GoGraph />
            Dashboard
            </Link>  

            <Link to="/admin/orders" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <TbBrandBooking />
            Orders
            </Link>

            <Link to="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <MdOutlineSpeaker />
            Items
            </Link>

            <Link to="/admin/users" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <MdSupervisedUserCircle />
            Users
            </Link>

             </div>

        

        <div className="w-[calc(100vw-200px)]"> 
             {userValidated &&< Routes path="/*">
                <Route path="/dashboard/*" element={<h1>Dashboard</h1>}/>
                <Route path="/orders/*" element={<AdminOrdersPage/>}/>
                <Route path="/items/*" element={<AdminItemPage/>}/>
                <Route path="/users" element={<AdminUsersPage/>}/>
                <Route path="/items/add" element={<AddItemPage/>}/>
                <Route path="/items/edit" element={<UpdateItemPage/>}/>
            </Routes>}

         </div>


    </div>

    );
}