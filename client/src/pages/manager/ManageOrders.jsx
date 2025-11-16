import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { assets } from "../../assets/assets";

const ManageOrders = () => {
  const { backendUrl, token, currency } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { "x-auth-token": token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle order status update
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { "x-auth-token": token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

//TODO Return
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Manage Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No orders available.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={assets.parcel_icon}
                    alt="parcel"
                    className="w-10 h-10"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      order.payment
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity}{" "}
                        <span className="text-gray-400">({item.size})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Address */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                  <p className="text-sm text-gray-700">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.address.country}, {order.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    📞 {order.address.phone}
                  </p>
                </div>

                {/* Summary + Status */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">
                      Total:{" "}
                      <span className="text-blue-600">
                        {currency}
                        {order.amount}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Items: {order.items.length}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label
                      htmlFor={`status-${order._id}`}
                      className="text-sm font-medium text-gray-700 mr-2"
                    >
                      Status:
                    </label>
                    <select
                      id={`status-${order._id}`}
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="p-2 rounded-md border border-gray-300 text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
