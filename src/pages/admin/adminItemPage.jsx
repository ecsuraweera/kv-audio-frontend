import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const sampleArr = [
  {
    key: "PRD001",
    name: "Wireless Headphones",
    price: 59.99,
    category: "Electronics",
    dimensions: "20x15x10 cm",
    description: "High-quality wireless headphones with noise cancellation.",
    availability: true,
    image: ["https://example.com/images/headphones.jpg"],
  },
  {
    key: "PRD002",
    name: "Smartphone Holder",
    price: 19.99,
    category: "Accessories",
    dimensions: "10x5x5 cm",
    description: "Adjustable smartphone holder for car dashboards.",
    availability: true,
    image: ["https://example.com/images/phone-holder.jpg"],
  },
];

export default function AdminItemPage() {
  const [items, setItems] = useState(sampleArr);
  const [itemsloaded, setItemsLoaded] = useState(false);

  useEffect(() => {
   if(!itemsloaded){
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/products",({ headers: { Authorization: `Bearer ${token}` } }))
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
        setItemsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
   }
  }, [itemsloaded]);

  const handleDelete = (key) => {
   if(window.confirm("Are you sure you want to delete this item?")){
    setItems(items.filter((item) => item.key !== key));
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/api/products/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        itemsloaded(!itemsloaded);

      })
      .catch((err) => {
        console.error(err);
      })
  
    toast.success("Item deleted successfully!");}
  };

  return (
    <div className="w-full h-screen p-5 bg-gray-100 flex items-center flex-col">
      {!itemsloaded &&<div className="border-4 my-4 border-b-blue-500 rounded-full animate-spin bg-0 w-[100px] h-[100px]"></div>}
      <div className="max-w-5xl mx-auto bg-white p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Product Management
        </h1>
        
        {itemsloaded &&<div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Key</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className="py-3 px-6 text-center">Category</th>
                <th className="py-3 px-6 text-center">Dimensions</th>
                <th className="py-3 px-6 text-center">Availability</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {items.map((product) => (
                <tr
                  key={product.key}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left">{product.key}</td>
                  <td className="py-3 px-6 text-left">{product.name}</td>
                  <td className="py-3 px-6 text-center">${product.price}</td>
                  <td className="py-3 px-6 text-center">{product.category}</td>
                  <td className="py-3 px-6 text-center">{product.dimensions}</td>
                  <td
                    className={`py-3 px-6 text-center font-semibold ${
                      product.availability ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.availability ? "Available" : "Not Available"}
                  </td>
                  <td className="py-3 px-6 text-center flex items-center justify-center space-x-2">
                    <Link
                      to={`/admin/items/edit/${product.key}`}
                       className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-sm flex items-center justify-center gap-1 w-20"
                    >
                      <FaEdit className="text-base" /> <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.key)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm flex items-center justify-center gap-1 w-20"
                    >
                      <RiDeleteBin6Fill className="text-base" /> <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        
        <Link to="/admin/items/add" className="fixed bottom-6 right-6 bg-blue-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110">
          <CiCirclePlus className="text-5xl" />
        </Link>
      </div>
    </div>
  );
}
