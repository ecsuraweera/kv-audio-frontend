import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import { formatDate } from "../../utils/cart"; // Import formatDate function
import axios from "axios";
import toast from "react-hot-toast";
import { use } from "react";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());

    // Default Dates
    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [total , setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart() {
        setCart(loadCart());
        calculateTotal();
    }

    function calculateTotal() {
        const cartInfo = loadCart();
        cartInfo.startingDate = startDate;
        cartInfo.endingDate = endDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        ).then((res) => {
            console.log(res.data); 
            setTotal(res.data.total);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        calculateTotal();
    },[startDate, endDate]);

    function handleBookingCreation() {
       const cart = loadCart();
       cart.startingDate = startDate;
       cart.endingDate = endDate;
       cart.days = daysBetween;

       const token = localStorage.getItem("token");
       axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
           headers: {
               Authorization: `Bearer ${token}`
           }
       }).then((res) => {
           console.log(res.data);
           localStorage.removeItem("cart");
           toast.success("Booking created successfully");
           setCart(loadCart());

       }).catch(err => {
        //    console.log(err);
        //    toast.error(err.response.data.error);
        console.log("Booking Creation Error:", err.response);
        toast.error(err.response?.data?.error || "Server Error: Failed to create booking");          
       })
    }

    // Calculate the number of days between start and end date
    function calculateDays() {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
        return diffDays > 0 ? diffDays : 0;
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold text-accent text-800 mb-4">Create Booking</h1>

            {/* Date Selection */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                {/* Start Date */}
                <label className="flex flex-col text-purple-700 font-semibold">
                    Start Date:
                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-md mt-1"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>

                {/* End Date */}
                <label className="flex flex-col text-purple-700 font-semibold">
                    End Date:
                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-md mt-1"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>

            {/* Display Number of Days */}
            <p className="text-lg font-semibold text-gray-800 mb-4">
                Total Days: <span className="text-blue-500">{calculateDays()}</span>
            </p>

            {/* Booking Items */}
            <div className="w-full flex flex-col items-center">
                {cart.orderedItems.map((item) => (
                    <BookingItem
                        key={item.key}
                        itemkey={item.key}
                        qty={item.qty}
                        refresh={reloadCart}
                    />
                ))}
            </div>
            <div className="w-full flex flex-col items-center mt-4 "><p className="text-2xl font-semibold text-accent text-800 mb-4">{`Rs. ${total.toFixed(2)}`}</p></div>
            <div className="w-full  flex flex-col items-center">
                <button className="w-[150px] h-[40px] bg-accent text-900 text-lg text-white rounded-lg shadow-md" onClick={handleBookingCreation}
                >Create Booking</button>
            </div>
        </div>
    );
}
