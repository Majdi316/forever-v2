//TODO Libraries
import { useEffect, useState } from "react";
//TODO Components
import ProductItem from "./ProductItem";
import Title from "./Title";
//TODO Variables
//TODO Theme Data
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";

//TODO Main Function
const BestSeller = () => {
  //TODO Variables
  const { theme, products } = useContext(UserContext);
  //TODO States
  const [bestSeller, setBestSeller] = useState([]);
  //TODO useEffects
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  //TODO Return
  if (!products || products.length === 0) {
    return (
      <div className="my-10">
        <div className=" text-center py-8 text-3xl">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextSecondary
                  : LIGHT_MODE.TextSecondary,
            }}
            className=" w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600"
          >
            Best sellers are on the way! Meanwhile, browse our newest arrivals
            and be the first to rock the season’s hottest looks.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-10">
        <div className=" text-center py-8 text-3xl">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextSecondary
                  : LIGHT_MODE.TextSecondary,
            }}
            className=" w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600"
          >
            Don’t miss out! Our best sellers are the hottest items in our
            collection — grab them before they’re gone.
          </p>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSeller.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    );
  }
};

export default BestSeller;
