//TODO Libraries
import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO Variables
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Components
import Title from "./Title";
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
import ProductItem from "./ProductItem";

//TODO Main Function
const LatestCollection = () => {
  //TODO Variables
  const { user, theme, products, navigate } = useContext(UserContext);
  //TODO States
  const [latestProducts, setLatestProducts] = useState([]);
  //TODO Function
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  //TODO Return

  if (!latestProducts || latestProducts.length === 0) {
    return (
      <div className="my-10 flex flex-col items-center justify-center">
        <div className="text-center py-8">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextSecondary
                  : LIGHT_MODE.TextSecondary,
            }}
            className="w-3/4 m-auto text-xs sm:text-sm md:text-base mb-6"
          >
            Stay ahead of the curve. Check out our latest collections and
            elevate your style with the season’s hottest looks.
          </p>

          <motion.div
            className="flex flex-col items-center mt-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_6xmxNro5reKFmW6iUceXcslgRK-N6_2Smw&s"
              alt="No products"
              className="w-40 h-40 mb-4 opacity-60"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextSecondary
                    : LIGHT_MODE.TextSecondary,
              }}
              className=" text-sm sm:text-base mb-2"
            >
              Oops! Looks like there are no products available right now.
            </p>

            {user?.isEmployee ? (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p
                  style={{
                    color:
                      theme === "dark"
                        ? DARK_MODE.TextSecondary
                        : LIGHT_MODE.TextSecondary,
                  }}
                  className=" mb-2"
                >
                  You can add new products:
                </p>
                <button
                  style={{
                    background: DARK_MODE.Accent,
                  }}
                  className=" cursor-pointer text-white font-semibold px-4 py-2 rounded shadow"
                  onClick={() => navigate("/employees/add-new-product")}
                >
                  Create Product
                </button>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-10">
        <div className=" text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextSecondary
                  : LIGHT_MODE.TextSecondary,
            }}
            className="w-3/4 m-auto text-xs sm:text-sm md:text-base"
          >
            Stay ahead of the curve. Check out our latest collections and
            elevate your style with the season’s hottest looks.
          </p>
        </div>
        {/* Rendering Products */}
        <div className="grid grid-cols-2 px-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    );
  }
};

export default LatestCollection;
