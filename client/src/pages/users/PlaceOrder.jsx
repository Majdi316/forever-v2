//TODO Libraries
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Assets
import { assets } from "../../assets/assets";
//TODO Components
import Title from "../../components/Title";
import CartTotal from "../../components/users/CartTotal";
//TODO MUI Components
import { Button, TextField } from "@mui/material";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Function
const PlaceOrder = () => {
  //TODO Variables
  const {
    navigate,
    delivery_fee,
    products,
    cartItems,
    setCartItems,
    token,
    backendUrl,
    getCartAmount,
    theme,
    paragraphTheme,
    buttonTheme,
  } = useContext(UserContext);
  //TODO State
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  //TODO Functions
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  //---------------------------------------------
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        //API Calls for COD
        case "cod":
          {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { "x-auth-token": token } }
            );
            if (response.data.success) {
              setCartItems({});
              navigate("/user/my-orders");
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message);
            }
          }
          break;
        case "stripe":
          {
            const responseStripe = await axios.post(
              backendUrl + "/api/order/stripe",
              orderData,
              { headers: { "x-auth-token": token } }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //TODO Return
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* --------------Left Side ----------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            label="First name"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            label="Last name"
            variant="outlined"
            fullWidth
          />
        </div>
        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          label="Email address"
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          label="Street"
          variant="outlined"
          fullWidth
        />
        <div className="flex gap-3">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            label="City"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            label="State"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="flex gap-3">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            label="ZipCode"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            label="Country"
            variant="outlined"
            fullWidth
          />
        </div>
        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          label="Phone"
          variant="outlined"
          fullWidth
        />
      </div>
      {/* ------------Right Side------------- */}
      <div className="mt-12 ml-2 sm:ml-10">
        <div style={paragraphTheme} className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ----------- payment method selection */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="mx-4 h-5" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="font-medium text-sm text-gray-500 mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full mt-8 text-end">
            <Button sx={{ ...buttonTheme, width: "100%" }} type="submit">
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
