import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const StatBox = ({ label, value }) => {
  const { titleTheme, paperTheme } = useContext(UserContext);
  return (
    <div style={paperTheme} className=" rounded-xl p-4 shadow text-center">
      <Typography style={titleTheme} className=" text-sm">
        {label}
      </Typography>
      <Typography className="font-bold text-lg">{value}</Typography>
    </div>
  );
};

export default StatBox;
