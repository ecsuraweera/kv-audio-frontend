import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {

 const location = useLocation();

  console.log(location.state);

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimention, setProductDimention] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productImage, setProductImage] = useState([]);
  const navigate = useNavigate();
  
  async function handleAddProduct() {

    let updatingImage = location.state.image;

    if(productImage.length > 0) {
      const promises = []
          for (let i = 0; i < productImage.length; i++) {
            console.log(productImage[i]);
            const promise = mediaUpload(productImage[i]);
            promises.push(promise);
          }

          updatingImage = await Promise.all(promises);
    }
    
    console.log(productKey, productName, productPrice, productCategory, productDimention, productDescription);
    const token = localStorage.getItem("token");

    if (token) {
      try{
        const result = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`, 
          {

            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimention,
            description: productDescription,
            image: updatingImage,
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
        <h1 className="text-2xl font-semibold text-center text-green-600 mb-6">Edit Product</h1>
        <div className="flex flex-col space-y-4">
          <input
            disabled
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
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="audio">Audio</option>
            <option value="lights">Lights</option>
          </select>
          <input
            onChange={(e) => setProductDimention(e.target.value)}
            value={productDimention}
            type="text"
            placeholder="Product Dimension"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
            type="text"
            placeholder="Product Description"
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input type = "file" multiple onChange={(e)=>{setProductImage(e.target.files)}} className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 "/>


          <button onClick = {handleAddProduct} className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-900 transition-all">
            Update Product
          </button>
          <button onClick={()=>{navigate("/admin/items")}}className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}