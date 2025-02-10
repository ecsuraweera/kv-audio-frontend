import { GoGraph } from "react-icons/go";
import { MdOutlineSpeaker, MdSupervisedUserCircle } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Routes, Route, Link } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";


export default function AdminPage() {
    return (
     <div className="w-full h-screen flex">

        <div className="w-[200px] h-full bg-gray-200">  

            <Link to="/admin/dashboard" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <GoGraph />
            Dashboard
            </Link>  

            <Link to="/admin/bookings" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <TbBrandBooking />
            Bookings
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
            <Routes path="/*">
                <Route path="/dashboard/*" element={<h1>Dashboard</h1>}/>
                <Route path="/bookings/*" element={<h1>Bookings</h1>}/>
                <Route path="/items/*" element={<AdminItemPage/>}/>
                <Route path="/users/*" element={<h1>Users</h1>}/>
                <Route path="/items/add" element={<AddItemPage/>}/>
            </Routes>

         </div>


    </div>

    );
}