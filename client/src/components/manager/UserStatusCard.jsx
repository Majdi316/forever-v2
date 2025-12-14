import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserStatusCard = ({ user }) => {
  const { titleTheme, paperTheme } = useContext(UserContext);
  return (
    <div className=" w-full flex flex-col sm:flex-row gap-10 p-10">
      <div
        style={paperTheme}
        className=" hover:scale-110 cursor-pointer rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>messages</p>
        <p>{user?.contacts.total}</p>
      </div>
      <div
        style={paperTheme}
        className="hover:scale-110 cursor-pointer rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>Orders #</p>
        <p>{user?.ordersCount}</p>
      </div>
      <div
        style={paperTheme}
        className="hover:scale-110 cursor-pointer rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>Spent</p>
        <p>{user?.ordersTotalAmount}$</p>
      </div>
      <div
        style={paperTheme}
        className="hover:scale-110 cursor-pointer rounded-2xl w-full flex items-center justify-center flex-col p-5"
      >
        <p style={titleTheme}>Reviews #</p>
        <p>{user?.reviewsCount}</p>
      </div>
    </div>
  );
};

export default UserStatusCard;
