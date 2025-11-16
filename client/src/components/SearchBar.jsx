//TODO Libraries
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Variables
import { assets } from "../assets/assets";

//TODO Main Function
const SearchBar = () => {
  //TODO VARIABLES
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(UserContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  //-------------------------------------------
  //TODO useEffect
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  //TODO Return
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className=" inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        className=" inline cursor-pointer w-3"
        src={assets.cross_icon}
        alt=""
        onClick={() => {
          setShowSearch(false);
        }}
      />
    </div>
  ) : null;
};

export default SearchBar;
