//TODO Libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";
//TODO Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
const ProductItem = ({ product }) => {
  //TODO States
  const [liked, setLiked] = useState(false);
  //TODO Variables
  const { userFullDetails, backendUrl, token } = useContext(UserContext);
  const { theme } = useContext(UserContext);
  const navigate = useNavigate();
  const isSoldOut = product.status.toLowerCase() === "Sold-Out".toLowerCase();
  const isComingSoon =
    product.status.toLowerCase() === "Coming-Soon".toLowerCase();
  //TODO Functions
  // Toggle like Function
  const toggleLike = async (e, productId) => {
    e.stopPropagation();
    if (isSoldOut) {
      return;
    }
    try {
      const response = await axios.patch(
        `${backendUrl}/api/products/like/${productId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setLiked((prev) => !prev);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle like");
    }
  };
  // Navigate to product page
  const goToProductPage = () => {
    if (!isSoldOut) {
      navigate(`/products/product-info/${product._id}`);
    }
  };

  // Calculate discounted price if user is subscribed
  const discountedPrice = userFullDetails?.isSubscribe
    ? (product.price * 0.8).toFixed(2)
    : null;

  useEffect(() => {
    if (userFullDetails && product.likes?.includes(userFullDetails._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userFullDetails, product.likes]);
  return (
    <div
      onClick={goToProductPage}
      style={{
        background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
        transition: "background 0.3s ease",
      }}
      className={`
        relative  rounded-xl shadow-md overflow-hidden
        hover:shadow-xl transition-shadow duration-300
        ${isSoldOut ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden group">
        <img
          src={product.image[0].url}
          alt={product.image[0].alt}
          className={`w-full h-48 object-cover transition-transform duration-300 ${
            !isSoldOut ? "group-hover:scale-105" : ""
          }`}
        />

        {/* Bestseller Badge */}
        {product.bestseller && !isSoldOut && !isComingSoon && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            BESTSELLER
          </span>
        )}

        {/* Sold Out Badge */}
        {isSoldOut && (
          <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded">
            SOLD OUT
          </span>
        )}
         {isComingSoon && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            COMING SOON
          </span>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => toggleLike(e, product._id)}
          disabled={isSoldOut}
          className={`absolute top-2 right-2 text-white bg-black bg-opacity-30 p-2 rounded-full transition
            ${!isSoldOut ? "hover:bg-opacity-50" : "cursor-not-allowed"}`}
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Product Info */}
      <div
        style={{
          color:
            theme === "dark"
              ? DARK_MODE.TextSecondary
              : LIGHT_MODE.TextSecondary,
        }}
        className="p-4 text-left"
      >
        <h3
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          }}
          className=" font-semibold text-lg truncate"
        >
          {product.name}
        </h3>
        <p className=" text-sm mt-1">
          {product.category} / {product.subCategory}
        </p>

        {/* Price */}
        <div className="mt-2">
          {discountedPrice ? (
            <div className="flex items-center gap-2">
              <span className="line-through">${product.price.toFixed(2)}</span>
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                ${discountedPrice}
              </span>
            </div>
          ) : (
            <span className=" font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Sizes */}
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span key={size} className="border px-2 py-1 rounded text-xs">
              {size}
            </span>
          ))}
        </div>
        <div
          style={{
            color: DARK_MODE.Accent,
          }}
          className="
    mt-3 
    text-xs 
    sm:text-sm 
    italic 
    flex 
    items-center 
    gap-1 
  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Added {moment(product.date).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
