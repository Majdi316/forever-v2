//TODO Libraries
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
//TODO Import function
import { getUser } from "../helper/decodeToken";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserContextProvider = (props) => {
  //TODO ------------- Variables ----------------------

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;

  //TODO ------------- State ----------------------
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => getUser());
  const [userFullDetails, setUserFullDetails] = useState(() => {
    const saved = localStorage.getItem("userDetails");
    return saved ? JSON.parse(saved) : null;
  });
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  //TODO ------------- Theme Styles ----------------------
  //------------- Button Theme ----------------------
  const buttonTheme = {
    color: "white",
    backgroundColor: DARK_MODE.Accent,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: DARK_MODE.AccentHover,
    },
  };
  //------------- Paper Theme ----------------------
  const paperTheme = {
    backgroundColor: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
    color:
      theme === "dark" ? DARK_MODE.TextSecondary : LIGHT_MODE.TextSecondary,
    transition: "background 0.3s ease, color 0.3s ease",
  };
  //------------- Title Theme ----------------------
  const titleTheme = {
    color: theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
    transition: "color 0.3s ease",
  };
  //------------- Paragraph Theme ----------------------
  const paragraphTheme = {
    color:
      theme === "dark" ? DARK_MODE.TextSecondary : LIGHT_MODE.TextSecondary,
    transition: "color 0.3s ease",
  };
  //TODO ------------- Function ----------------------
  //!----------------- Cart ----------------------
  //---------- Add to Cart -----------
  const addToCart = async (productId, size) => {
    //! Validate size selection
    if (!size || size === "") {
      toast.error("Select Product Size");
      return;
    }
    //! Update cartItems state
    let cartData = structuredClone(cartItems);
    //! Check if product already in cart
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    setCartItems(cartData);

    try {
      const response = await axios.post(
        backendUrl + "/api/cart/add",
        { productId, size },
        { headers: { "x-auth-token": token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to add to cart");
    }
  };
  //---------- Update Quantity -----------
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { "x-auth-token": token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  //---------- Get User Cart -----------
  const getUserCart = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { "x-auth-token": token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //---------- Get Cart Count -----------
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
          // eslint-disable-next-line no-unused-vars, no-empty
        } catch (error) {}
      }
    }
    return totalCount;
  };
  //---------- Get Cart Amount -----------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            if (userFullDetails.isSubscribe) {
              totalAmount += itemInfo.price * cartItems[items][item] * 0.8;
            }else{
               totalAmount += itemInfo.price * cartItems[items][item];
            }
          }
          // eslint-disable-next-line no-unused-vars, no-empty
        } catch (error) {}
      }
    }
    return totalAmount;
  };
  //!-------------------------------------------------------------------------
  //---------- Logout -----------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setUserFullDetails(null);
    toast.success("Logout successful!");
    navigate("/login");
  };
  //---------- toggle theme -----------
  const toggleTheme = () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
  };
  //---------- get user details -----------
  const getUserDetails = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/auth/check-auth");
      if (res.data.success) {
        setUserFullDetails(res.data.user);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //!----------------- Products ----------------------
  //---------- get product details -----------
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products");
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //----------------- Toggle Like  ----------------------
  const toggleProductLikeInContext = (productId, userId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId
          ? {
              ...p,
              likes: p.likes.includes(userId)
                ? p.likes.filter((id) => id !== userId)
                : [...p.likes, userId],
            }
          : p
      )
    );
  };
  //TODO ---------------- useEffect -------------------
  //---------- Fetch products data on mount -----------
  useEffect(() => {
    getProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //---------- Auto logout on inactivity -----------
  useEffect(() => {
    if (!token) return;

    let timer;

    const resetInactivityTimer = () => {
      clearTimeout(timer);
      //  hours = h * m * s * ms
      timer = setTimeout(() => {
        toast.info("Session expired due to inactivity. Please log in again.");
        logout();
      }, 4 * 60 * 60 * 1000);
    };

    // Activity events that reset timer
    window.onload = resetInactivityTimer;
    document.onmousemove = resetInactivityTimer;
    document.onkeypress = resetInactivityTimer;
    document.onscroll = resetInactivityTimer;
    document.onclick = resetInactivityTimer;

    // Start timer immediately
    resetInactivityTimer();

    return () => {
      clearTimeout(timer);
      window.onload = null;
      document.onmousemove = null;
      document.onkeypress = null;
      document.onscroll = null;
      document.onclick = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Recreate timer only when user logs in/out

  //---------------------------------------------------
  useEffect(() => {
    if (token) {
      const decoded = getUser();
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);
  //---------------------------------------------------
  useEffect(() => {
    if (!user || !token) return;

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/users/${user._id}`, {
          headers: { "x-auth-token": token },
        });
        setUserFullDetails(res.data);
        localStorage.setItem("userDetails", JSON.stringify(res.data));
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch user");
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, token]);
  //---------------------------------------------------
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  //TODO ------------- Values ----------------------
  const value = {
    products,
    setProducts,
    backendUrl,
    token,
    setToken,
    navigate,
    logout,
    user,
    setUser,
    userFullDetails,
    getUserDetails,
    setUserFullDetails,
    toggleTheme,
    theme,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    buttonTheme,
    paperTheme,
    titleTheme,
    paragraphTheme,
    addToCart,
    cartItems,
    setCartItems,
    updateQuantity,
    delivery_fee,
    getCartCount,
    getCartAmount,
    toggleProductLikeInContext,
  };
  //TODO ------------- Return ----------------------
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
