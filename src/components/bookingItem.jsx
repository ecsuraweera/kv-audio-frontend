import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItem({ itemkey, qty, refresh }) {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemkey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          removeFromCart(itemkey);
          refresh();
        });
    }
  }, [status]);

  if (status === "loading") {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }
  if (status === "error") {
    return <div className="p-4 text-red-500">Failed to load item.</div>;
  }

  return (
    <div className="w-[650px] h-[75px] flex items-center p-2 bg-primary rounded-lg shadow-md mt-5 relative hover:bg-purple-200">
        <FaTrash className="absolute right-[-25px] text-gray-300 hover:text-red-600 hover:scale-110 transition-transform transform" onClick={() => {removeFromCart(itemkey); refresh();}}/>
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-[55px] h-[55px] rounded-lg object-contain border border-gray-300 mr-4"
      />
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-xl font-semibold text-accent">{item.name}</h3>
        <p className="text-lg font-semibold text-gray-400">
        {`Rs. ${item.price.toFixed(2)}`}
        </p>
        <div className="relative flex flex-col items-center">
          <button
            className="text-gray-400 hover:text-accent hover:scale-110 transition-transform transform"
            onClick={() => {
              addToCart(itemkey, +1);
              refresh();
            }}
          >
            <FaArrowUp />
          </button>
          <p className="text-lg font-semibold text-gray-500">{qty}</p>
          <button
            className="text-gray-400 hover:text-accent hover:scale-110 transition-transform transform"
            onClick={() => {
              if (qty > 1) {
                addToCart(itemkey, -1); // Reduce quantity
              } else {
                removeFromCart(itemkey); // Remove item if qty is 1
              }
              refresh(); // Refresh after changing cart
            }}
          >
            <FaArrowDown />
          </button>
        </div>

        <p className="text-xl font-semibold text-gray-800">
        {`Rs. ${(item.price * qty).toFixed(2)}`}

        </p>
      </div>
    </div>
  );
}
