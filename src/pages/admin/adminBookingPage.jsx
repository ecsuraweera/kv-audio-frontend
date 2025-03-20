import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []); // Ensure orders is always an array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOrders([]); // Set orders to empty array on error
        setLoading(false);
      });
  }, [loading]);

  function handleOrderStatusChange(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        { 
          status: status, 
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLoading(true); // Reload orders after status update
      })
      .catch((err) => {
        console.error(err);
        setLoading(true);
      });
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Orders</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-accent text-white">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Days</th>
                <th className="px-4 py-2">Starting Date</th>
                <th className="px-4 py-2">Ending Date</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-purple-300 cursor-pointer"
                  onClick={() => {
                    setActiveOrder(order);
                    setModalOpened(true);
                  }}
                >
                  <td className="px-4 py-2 text-center">{order.orderId}</td>
                  <td className="px-4 py-2 text-center">{order.email}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">{order.days}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(order.startingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(order.endingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-right font-bold">
                    Rs. {order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpened && (
        <div className="fixed top-0 left-0 w-full bg-[#00000060] flex items-center justify-center">
          
          <div className="w-[700px] bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
          <IoMdCloseCircleOutline className="absolute top-4 right-4 text-2xl cursor-pointer hover:text-red-600" onClick={() => setModalOpened(false)} />
            <h1 className="text-xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-2">
              Order Details
            </h1>
            <div className="flex flex-col text-gray-700 text-base">
              <p>
                <span className="font-semibold text-gray-900">
                  Order ID:
                </span>{" "}
                {activeOrder.orderId}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {activeOrder.email}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  Order Date:
                </span>{" "}
                {new Date(activeOrder.orderDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Days:</span>{" "}
                {activeOrder.days}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  Starting Date:
                </span>{" "}
                {new Date(activeOrder.startingDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  Ending Date:
                </span>{" "}
                {new Date(activeOrder.endingDate).toLocaleDateString()}
              </p>
              <p className="font-semibold text-gray-900 ">
                <span className="text-green-600 font-bold">
                  Total Amount:
                </span>{" "}
                Rs. {activeOrder.totalAmount.toFixed(2)}
              </p>
              <p className="font-semibold text-gray-900 flex items-center">
                Approval Status:{" "}
                {activeOrder.status}
              </p>
            </div>
            <div className="w-full flex items-left rounded-xl my-4">
                <button onClick={() => {handleOrderStatusChange(activeOrder.orderId,"Approved")}} className="text-white bg-green-500 text-base font-semibold py-1 px-2 rounded-xl" >Approve Order</button>
                <button onClick={() => {handleOrderStatusChange(activeOrder.orderId,"Rejected")}} className="text-white bg-red-500 text-base font-semibold py-1 px-2 rounded-xl" >Reject Order</button>
            </div>
            <table className="w-full shadow-lg bg-white rounded-xl overflow-hidden mt-4 border border-gray-200">
              <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                <tr className="text-lg uppercase font-semibold tracking-wide">
                  <th className="px-6 py-3 text-left">PID</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {activeOrder?.orderedItems?.map((item) => (
                  <tr
                    key={item.key}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-6 py-3">{item.key}</td>
                    <td className="px-6 py-3">{item.quantity}</td>
                    <td className="px-6 py-3 font-medium">{item.name}</td>
                    <td className="px-6 py-3 font-semibold text-green-600">
                      Rs. {item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded-lg shadow-md border"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
