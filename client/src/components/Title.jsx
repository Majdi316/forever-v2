//TODO Libraries
import { useContext } from "react";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";

//TODO Main Function
const Title = ({ text1, text2 }) => {
  //TODO Variables
  const { theme } = useContext(UserContext);
  //TODO Return
  return (
    <div className=" inline-flex gap-2 items-center mb-3">
      <p
        style={{
          color:
            theme === "dark"
              ? DARK_MODE.TextSecondary
              : LIGHT_MODE.TextSecondary,
        }}
      >
        {text1}{" "}
        <span
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          }}
          className="font-medium"
        >
          {text2}
        </span>
      </p>
      <p
        style={{
          background:
            theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
        }}
        className=" w-8 sm:w-12 h-[1px] sm:h-[2px]"
      ></p>
    </div>
  );
};

export default Title;
