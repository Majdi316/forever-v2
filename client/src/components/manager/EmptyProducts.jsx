//TODO Libraries
import { useContext } from "react";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO MUI Components
import { Typography } from "@mui/material";
//TODO Main Component
const EmptyProducts = () => {
    //TODO Variables
  const { titleTheme, paragraphTheme } = useContext(UserContext);
  //TODO Return
  return (
    <div className=" w-full flex flex-col items-center justify-center py-20 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
        alt="No products"
        className="w-40 mb-4 opacity-70"
      />

      <Typography sx={titleTheme} variant="h6" className="mb-2">
        No products found
      </Typography>

      <Typography sx={paragraphTheme} variant="body2" color="text.secondary">
        Try adjusting your search or filters
      </Typography>
    </div>
  );
};

export default EmptyProducts;
