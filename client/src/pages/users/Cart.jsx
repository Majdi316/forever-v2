//TODO Libraries
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Components
import Title from "../../components/Title";
import CartTotal from "../../components/users/CartTotal";
//TODO Assets
import { assets } from "../../assets/assets";

//TODO Main Function
const Cart = () => {
 //TODO Variables 
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(UserContext);
//TODO State
  const [cartData, setCartData] = useState([]);
 //TODO Effects
  useEffect(() => {
    const tempData = Object.entries(cartItems).flatMap(([productId, sizes]) =>
      Object.entries(sizes)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          _id: productId,
          size,
          quantity,
        }))
    );
    setCartData(tempData);
  }, [cartItems]);

  // Empty cart UI
  if (!cartData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-60 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/collection")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Return
  return (
    <div className="pt-14 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 pb-20">
      {/* Header */}
      <div className="mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          if (!productData) return null;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              {/* Product Info */}
              <div className="flex items-start gap-5">
                <img
                  className="w-20 h-20 object-cover rounded-xl"
                  src={productData.image?.[0]?.url}
                  alt={productData.name}
                />
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {productData.name}
                  </p>
                  <div className="flex items-center mt-2 gap-3 text-sm text-gray-600">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <span className="px-3 py-1 border rounded-md bg-slate-50">
                      Size: {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity & Delete */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!val || val <= 0)
                      return toast.error("Quantity must be greater than 0");
                    updateQuantity(item._id, item.size, val);
                  }}
                  className="border w-16 text-center rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt="Remove item"
                  className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end mt-16">
        <div className="w-full sm:w-[400px] bg-gray-50 rounded-2xl p-6 shadow-md">
          <CartTotal />
          <div className="text-end mt-8">
            <button
              onClick={() => navigate("/user/place-order")}
              className="bg-black text-white text-sm px-8 py-3 rounded-lg hover:bg-gray-800 transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
