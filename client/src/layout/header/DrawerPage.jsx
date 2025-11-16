//TODO Libraries
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
//TODO Material UI Component
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
//TODO Icons
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LoginIcon from "@mui/icons-material/Login";
import CheckroomIcon from "@mui/icons-material/Checkroom";
//TODO Context
import { UserContext } from "../../context/UserContext";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Routes
import ROUTES from "../../routes/routesData";
//TODO Components
import UserDrawer from "./UserDrawer";
//TODO Main Function

const DrawerPage = ({
  drawerWidth,
  displayMenu,
  drawerType,
  hideDrawer,
  path,
}) => {
  drawerWidth = "240px";
  //TODO Variables
  const navigate = useNavigate();
  const { theme, toggleTheme, user } = useContext(UserContext);
  //TODO Return
  return (
    <Drawer
      sx={{
        backgroundColor:
          theme === "dark" ? DARK_MODE.Primary : LIGHT_MODE.Primary,
        transition: "background 0.3s ease",
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: displayMenu, md: displayMenu },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor:
            theme === "dark" ? DARK_MODE.Primary : LIGHT_MODE.Primary,
          transition: "background 0.3s ease",
        },
      }}
      variant={drawerType}
      anchor="left"
      open={true}
      onClose={() => {
        hideDrawer();
      }}
    >
      <Button
        sx={{
          mt: "10px",
          background: DARK_MODE.Accent,
          cursor: "pointer",
          fontSize: "25px",
        }}
        onClick={toggleTheme}
        variant="contained"
      >
        {theme === "dark" ? <SunnyIcon /> : <BedtimeIcon />}
      </Button>
      <List>
        {/*----------------- 1 -------------------*/}
        <ListItem
          disablePadding
          sx={{
            fontWeight: "bold",
            bgcolor: path === ROUTES.root ? DARK_MODE.Accent : null,
            color: "white",
            cursor: "pointer",
            "&:hover": {
              background: DARK_MODE.Accent,
              transition: "background 0.3s ease",
              opacity: 0.7,
            },
          }}
        >
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon
                sx={{
                  color: "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {/*----------------- 2 -------------------*/}
        <ListItem
          disablePadding
          sx={{
            fontWeight: "bold",
            bgcolor: path === ROUTES.collection ? DARK_MODE.Accent : null,
            color: "white",
            cursor: "pointer",
            "&:hover": {
              background: DARK_MODE.Accent,
              transition: "background 0.3s ease",
              opacity: 0.7,
            },
          }}
        >
          <ListItemButton onClick={() => navigate("/collection")}>
            <ListItemIcon>
              <CheckroomIcon
                sx={{
                  color: "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Collection" />
          </ListItemButton>
        </ListItem>
        {/*----------------- 2 -------------------*/}
        <ListItem
          disablePadding
          sx={{
            fontWeight: "bold",
            bgcolor: path === ROUTES.contactUs ? DARK_MODE.Accent : null,
            color: "white",
            cursor: "pointer",
            "&:hover": {
              background: DARK_MODE.Accent,
              transition: "background 0.3s ease",
              opacity: 0.7,
            },
          }}
        >
          <ListItemButton onClick={() => navigate("/contact-us")}>
            <ListItemIcon>
              <EmailIcon
                sx={{
                  color: "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>
        {/*----------------- 2 -------------------*/}
        <ListItem
          disablePadding
          sx={{
            fontWeight: "bold",
            bgcolor: path === ROUTES.about ? DARK_MODE.Accent : null,
            color: "white",
            cursor: "pointer",
            "&:hover": {
              background: DARK_MODE.Accent,
              transition: "background 0.3s ease",
              opacity: 0.7,
            },
          }}
        >
          <ListItemButton onClick={() => navigate("/about")}>
            <ListItemIcon>
              <InfoIcon
                sx={{
                  color: "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        {/*----------------- 3 -------------------*/}
        {user ? null : (
          <>
            <ListItem
              disablePadding
              sx={{
                fontWeight: "bold",
                bgcolor: path === ROUTES.register ? DARK_MODE.Accent : null,
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  background: DARK_MODE.Accent,
                  transition: "background 0.3s ease",
                  opacity: 0.7,
                },
              }}
            >
              <ListItemButton onClick={() => navigate("/register")}>
                <ListItemIcon>
                  <PersonAddAlt1Icon
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            {/*----------------- 4 -------------------*/}
            <ListItem
              disablePadding
              sx={{
                fontWeight: "bold",
                bgcolor: path === ROUTES.login ? DARK_MODE.Accent : null,
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  background: DARK_MODE.Accent,
                  transition: "background 0.3s ease",
                  opacity: 0.7,
                },
              }}
            >
              <ListItemButton onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <LoginIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {/*----------------- Users Only -------------------*/}
        {user ? (
          <>
            <Divider sx={{ color: "red", width: "75%", margin: "0 auto" }}>
              USER
            </Divider>
            <UserDrawer
              user={user}
              path={path}
              ROUTES={ROUTES}
              navigate={navigate}
              theme={theme}
              DARK_MODE={DARK_MODE}
            />
          </>
        ) : null}
      </List>
    </Drawer>
  );
};

export default DrawerPage;
