import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
//TODO Main Function
const Verify = () => {
  //TODO Variables
  const { navigate, token, setCartItems, backendUrl } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  //TODO Function
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { orderId, success },
        { headers: { "x-auth-token": token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/user/my-orders");
      } else {
        navigate("/user/my-cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  //TODO Return
  return <div></div>;
};

export default Verify;
