//TODO Libraries
import { useContext } from "react";
import { Link } from "react-router-dom";
//TODO Material UI
import { IconButton, AppBar, Toolbar, Typography, Avatar } from "@mui/material";
//TODO Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";

//TODO Main Function
const AppBarPage = ({ drawerWidth, showDrawer }) => {
  //TODO Variables
  const { theme, userFullDetails, user, setShowSearch } =
    useContext(UserContext);
  //TODO Return
  return (
    <>
      <AppBar
        sx={{
          backgroundColor:
            theme === "dark" ? DARK_MODE.Primary : LIGHT_MODE.Primary,
          color: "white",
          ml: { xs: 0, md: drawerWidth },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth})` },
          transition: "background 0.3s ease",
        }}
        position="static"
      >
        <Toolbar>
          {/* ----------------------------------------------------- */}
          <IconButton
            aria-label=""
            onClick={() => {
              showDrawer();
            }}
          >
            <MenuIcon
              sx={{ color: "white", display: { xs: "block", md: "block" } }}
            />
          </IconButton>
          {/* ----------------------------------------------------- */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <p className="appBarLogo">
                For<span>ever</span>-V2{" "}
              </p>
            </Link>
          </Typography>
          <button
            className=" mr-3.5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          >
            {" "}
            <SearchIcon />
          </button>
          {/* ----------------------------------------------------- */}
          {!user ? null : (
            <Typography
              className="fullName"
              variant="h6"
              sx={{ marginRight: "12px", flexGrow: { xs: 1, sm: 0 } }}
            >
              {userFullDetails?.name?.first +
                " " +
                userFullDetails?.name?.middle +
                " " +
                userFullDetails?.name?.last}
            </Typography>
          )}

          {/* ----------------------------------------------------- */}
          {!user ? null : (
            <Avatar
              alt="User Avatar"
              src={userFullDetails?.image?.url}
              sx={{ width: 40, height: 40 }}
            />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarPage;
