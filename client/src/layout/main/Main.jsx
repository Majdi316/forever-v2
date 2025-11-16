//TODO Libraries
import { useContext } from "react";

//TODO MUI
import { Box } from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Function
const Main = ({ children, drawerWidth }) => {
  //TODO Variables
  const { theme } = useContext(UserContext);
  //TODO Return
  return (
    <Box 
      sx={{
        ml: { xs: 0, md: drawerWidth },
        width: { xs: "100%", md: `calc(100% - ${drawerWidth})` },
        display: "flex",
        minHeight: "100vh",
        background:
          theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
          paddingX: { xs: 2, md: 3 },
          paddingY: 3,
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
