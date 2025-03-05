import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("Audio");
  const [productDimention, setProductDimention] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState([]);

  const navigate = useNavigate();

  async function handleAddProduct() {
    
    const promises = []
    for (let i = 0; i < productImage.length; i++) {
      console.log(productImage[i]);
      const promise = mediaUpload(productImage[i]);
      promises.push(promise);
    }

    


    console.log(
                productKey, 
                productName, 
                productPrice, 
                productCategory, 
                productDimention, 
                productDescription
              );
    const token = localStorage.getItem("token");
    
    if (token) {
      try{

            // Promise.all(promises).then((result) => {
        //   console.log(result);
        //     }).catch((err) => {
        //       toast.error(err);
        //     })

        const imageUrls = await Promise.all(promises);

        const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,
          {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimention,
            description: productDescription,
            image: imageUrls,
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
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="border-2 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="Audio">Audio</option>
            <option value="Lights">Lights</option>
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
