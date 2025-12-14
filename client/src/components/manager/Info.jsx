import React from "react";

const Info = ({ label, value, titleTheme }) => {
  return (
    <div className="flex flex-col">
      <span style={titleTheme} className=" text-xs">
        {label}
      </span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
};

export default Info;
