//TODO Libraries
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO MUI Components
import { Button } from "@mui/material";
//TODO Components
import Title from "../components/Title";
import Reviews from "../components/Reviews";


const ProductInfo = () => {
  //TODO Variables
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    userFullDetails,
    buttonTheme,
    titleTheme,
    paragraphTheme,
    addToCart,
  } = useContext(UserContext);
  const isSubscribe = userFullDetails?.isSubscribe;
  //TODO State
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  //TODO useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
    const found = products.find((item) => item._id === id);
    if (!found) {
      navigate("/not-found");
    } else {
      setProduct(found);
      setSelectedImage(found.image[0]?.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  if (!product) return null;

  //TODO Discount Calculation
  const finalPrice = isSubscribe
    ? Math.round(product.price * 0.8)
    : product.price;

  //TODO Return
  return (
    <div
      className={`max-w-7xl mx-auto px-6 py-10 min-h-screen transition-all duration-300`}
    >
      {/* Title */}
      <div className="text-center mb-10 text-2xl sm:text-3xl font-bold">
        <Title text1="Product" text2="Details" />
      </div>
      {/* Product Layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col gap-3 lg:w-1/2">
          <div
            className={`relative rounded-2xl overflow-hidden shadow-lg ${
              product.status === "sold out" ? "opacity-60" : ""
            }`}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[400px] object-fill rounded-2xl"
            />
            {product.status === "sold out" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold text-lg">
                SOLD OUT
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                onClick={() => setSelectedImage(img.url)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all ${
                  selectedImage === img.url
                    ? "border-[#FF7043] scale-105"
                    : "border-transparent hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div style={paragraphTheme} className="flex flex-col gap-6 lg:w-1/2">
          <h2 style={titleTheme} className="text-3xl font-bold">
            {product.name}
          </h2>
          <p>{product.description}</p>

          <div className="flex items-center gap-4">
            <span style={titleTheme} className="text-2xl font-semibold">
              ${finalPrice}
            </span>
            {isSubscribe && (
              <span className="text-sm text-green-500 font-medium">
                (20% off for subscribers)
              </span>
            )}
          </div>

          {/* Sizes */}
          <div>
            <p style={titleTheme} className="font-semibold mb-2">
              Select Size:
            </p>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border border-[#FF7043] rounded-full px-4 py-2 text-sm transition-all ${
                    selectedSize === size
                      ? "bg-[#FF7043] text-white"
                      : "hover:bg-[#FF8A65]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart / Like */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => addToCart(product._id, selectedSize)}
              disabled={product.status === "sold out"}
              sx={{
                ...buttonTheme,
                borderRadius: "9999px",
                padding: "12px 24px",
              }}
            >
              Add to Cart
            </Button>
          </div>

          {/* Date */}
          <div className="text-xl italic text-red-500 mt-6 flex items-center gap-1">
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
            Added {moment(product.date).fromNow()}
          </div>
          <hr className="mt-8 sm:w3/4" />
          <div className="text-sm mt-5 gap-1 flex flex-col">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available in this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <Reviews />
    </div>
  );
};

export default ProductInfo;
