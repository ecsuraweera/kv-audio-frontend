import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {

    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");//loading,success,error
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
        .then(res => {
             setProduct(res.data);
             setLoadingStatus("loaded");
             console.log(res.data);
        }).catch((err) => {
            console.error(err);
            setLoadingStatus("error");
        })

    },
    
    []);

    return (
        <div className="w-full h-full flex justify-center">
            {
                loadingStatus == "loading" && <div className="w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent"></div>
                </div>

            }
            {
                loadingStatus == "loaded" && 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[49%] h-full">
                        <ImageSlider images={product.image} />
                    </div>
                    <div className="w-[49%] h-full  flex flex-col p-4 gap-5">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <h2 className="text-2xl font-bold">{product.category}</h2>
                    <p className="text-2xl font-bold">Rs. {product.price}/=</p>
                    <p className="text-xl ">{product.description}</p>

                    <div className="mt-4 text-sm text-gray-500 inline-flex">
                        <span className="font-medium">Dimensions:</span>
                        <span className="text-gray-700 ml-2">{product.dimensions}</span>

                    </div>
                    <button className="w-[250px] h-[60px] bg-accent text-900 text-3xl text-white rounded-lg" onClick={()=>{
                        addToCart(product.key,1);
                        toast.success("Item added to cart");
                        console.log(loadCart());
                    }}>Add to Cart</button>
                    </div>
                    
                </div>
            }
            {
                loadingStatus == "error" && <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold">Something went wrong</h1>
                </div>
            }
        </div>
    );
}