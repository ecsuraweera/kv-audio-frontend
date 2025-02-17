import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
    const [state,setState] = useState("loading");//loading,success,error
    const [items, setItems] = useState([]);
    

    useEffect(() => {

        if(state == "loading") {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then(res => {
            console.log(res.data);
            setItems(res.data);
            setState("success");
            })
            .catch(err => {
                toast.error(err?.response?.data?.error||"Something went wrong");
                setState("error");
            })
        }

    }, []);

    return (
        <div className="w-full h-screen flex flex-wrap justify-center pt-[50px]">
            {state == "loading" &&
            <div className="w-full h-screen flex justify-center items-center ">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">

                </div>
            </div>}

            {
                state == "success" && items.map((item)=> {

                    return (
                        <ProductCard key={item.key} item={item}/>
                       

                    )
                })

            }
        </div>
    );
 
}
