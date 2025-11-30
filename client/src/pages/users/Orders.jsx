//TODO Libraries
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Components
import Title from "../../components/Title";
//TODO MUI Components
import { Button } from "@mui/material";
//TODO THEME
import { DARK_MODE } from "../../theme/themeData";
//TODO Main Component
const Orders = () => {
  //TODO Variables
  const {
    currency,
    backendUrl,
    token,
    titleTheme,
    buttonTheme,
    navigate,
    paragraphTheme,
    paperTheme,
  } = useContext(UserContext);

  //TODO State
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  //TODO Functions
  const loadOrderData = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        {},
        { headers: { "x-auth-token": token } }
      );

      if (res.data.success) {
        const orders = res.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(orders.reverse());
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  // Status colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-400";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };
  //TODO useEffects
  useEffect(() => {
    loadOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // TODO Return
  return (
    <div className="pt-16 pb-20 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40  transition-all duration-300">
      {/* Title */}
      <div className="mb-8 text-center sm:text-left text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <p
            style={{ color: DARK_MODE.Accent }}
            className="text-lg animate-pulse font-bold"
          >
            Loading orders...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && orderData.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No orders"
            className="w-32 sm:w-40 opacity-70 mb-6"
          />
          <h2
            style={titleTheme}
            className="text-xl sm:text-2xl font-semibold mb-2"
          >
            You have no orders yet
          </h2>
          <p style={paragraphTheme} className=" mb-6 text-sm sm:text-base">
            Looks like you haven’t made your first purchase yet.
          </p>
          <Button style={buttonTheme} onClick={() => navigate(`/collection`)}>
            Start Shopping
          </Button>
        </div>
      )}

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orderData.map((item, index) => (
          <div
            style={paperTheme}
            key={index}
            className=" rounded-2xl  p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Product Info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <img
                src={item.image[0]?.url}
                alt={item.name}
                className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <p
                  style={titleTheme}
                  className="font-semibold  text-base sm:text-lg"
                >
                  {item.name}
                </p>
                <div className="flex flex-wrap gap-3 text-sm mt-2">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <div className="mt-3 text-xs sm:text-sm  space-y-1">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    {item.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 border-t pt-4 gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${getStatusColor(
                    item.status
                  )}`}
                ></span>
                <p
                  style={titleTheme}
                  className="text-sm sm:text-base font-medium capitalize "
                >
                  {item.status}
                </p>
              </div>
              <Button sx={buttonTheme} onClick={loadOrderData}>
                Track Order
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
