import { GoGraph } from "react-icons/go";
import { MdOutlineSpeaker, MdSupervisedUserCircle } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

export default function AdminPage() {
    return (
     <div className="w-full h-screen flex">

        <div className="w-[300px] h-full bg-gray-200">  

            <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <GoGraph />
            Dashboard
            </button>  

            <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <TbBrandBooking />
            Bookings
            </button>

            <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <MdOutlineSpeaker />
            Items
            </button>

            <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
            <MdSupervisedUserCircle />
            Items
            </button>

             </div>

        

        <div className="w-full bg-blue-200">  </div>


    </div>

    );
}