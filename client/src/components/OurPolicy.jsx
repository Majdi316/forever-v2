//TODO Variables
import { assets } from "../assets/assets";
import { useContext } from "react";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Theme Data
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";

//TODO Main Function
const OurPolicy = () => {
  //TODO Variables
  const { theme } = useContext(UserContext);
  //TODO Return
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          }}
          className=" font-semibold"
        >
          Easy Exchange Policy
        </p>
        <p
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
          }}
        >
          We offer hassle free exchange policy
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          }}
          className=" font-semibold"
        >
          7 Days Return Policy
        </p>
        <p
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
          }}
        >
          We provide 7 days free return policy
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          }}
          className=" font-semibold"
        >
          Best Customer Support
        </p>
        <p
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
          }}
        >
          We provide 24/7 customer support
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
