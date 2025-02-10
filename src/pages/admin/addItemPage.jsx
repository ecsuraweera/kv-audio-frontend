import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCatogory, setProductCatogory] = useState("Audio");
  const [productDemention, setProductDemention] = useState("");
  const [productDiscription, setProductDiscription] = useState("");
  const navigate = useNavigate();

  async function handleAddProduct() {
    
    console.log(productKey, productName, productPrice, productCatogory, productDemention, productDiscription);
    const token = localStorage.getItem("token");

    if (token) {
      try{
        const result = await axios.post(
          "http://localhost:3000/api/products",
          {
            key: productKey,
            name: productName,
            price: productPrice,
            catagory: productCatogory,
            dimensions: productDemention,
            description: productDiscription,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
  toast.success(result.data.message);
  navigate("/admin/items");

  }catch(err){
        toast.error(err.response.data.error);
  }
    }else{
      toast.error("Please Login First");
    }

  }

  return (
    <div className="w-full h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl w-[400px] p-6">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add Product</h1>
        <div className="flex flex-col space-y-4">
          <input
            onChange={(e) => setProductKey(e.target.value)}
            value={productKey}
            type="text"
            placeholder="Product Key"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            type="text"
            placeholder="Product Name"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={(e) => setProductPrice(Number(e.target.value))}
            value={productPrice}
            type="number"
            placeholder="Product Price"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={productCatogory}
            onChange={(e) => setProductCatogory(e.target.value)}
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="audio">Audio</option>
            <option value="lights">Lights</option>
          </select>
          <input
            onChange={(e) => setProductDemention(e.target.value)}
            value={productDemention}
            type="text"
            placeholder="Product Dimension"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={(e) => setProductDiscription(e.target.value)}
            value={productDiscription}
            type="text"
            placeholder="Product Description"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button onClick = {handleAddProduct} className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-all">
            Add Product
          </button>
          <button onClick={()=>{navigate("/admin/items")}}className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
