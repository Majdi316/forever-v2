//TODO Libraries
import React, { useContext } from "react";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Component
const Stat = ({ label, value }) => {
  //TODO Variables
  const { titleTheme, paperTheme, theme } = useContext(UserContext);
  //TODO Return
  return (
    <div
      style={{
        ...paperTheme,
        background:
          theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
      }}
      className=" rounded-lg text-center py-2"
    >
      <div className="font-bold">{value ?? 0}</div>
      <div style={titleTheme} className="text-xs ">
        {label}
      </div>
    </div>
  );
};

export default Stat;
