import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ProfileItem = ({ label, value }) => {
  const { paperTheme, titleTheme } = useContext(UserContext);
  return (
    <div
      style={paperTheme}
      className="flex justify-between p-3 rounded-lg shadow-sm"
    >
      <span style={titleTheme} className="font-medium ">
        {label}
      </span>
      <span className=" font-semibold">{value}</span>
    </div>
  );
};

export default ProfileItem;
