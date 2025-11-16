//TODO Libraries
import { useContext } from "react";
//TODO MUI Components
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//TODO MUI Icons
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
//TODO Context
import { UserContext } from "../../context/UserContext";
import ManagerDrawer from "./ManagerDrawer";
import EmployeeDrawer from "./EmployeeDrawer";
const UserDrawer = ({ path, navigate, ROUTES, DARK_MODE, user, theme }) => {
  const { logout, getCartCount } = useContext(UserContext);
  return (
    <>
      {/*----------------- 1 -------------------*/}
      <ListItem
        disablePadding
        sx={{
          fontWeight: "bold",
          bgcolor: path === ROUTES.profile ? DARK_MODE.Accent : null,
          color: "white",
          cursor: "pointer",
          "&:hover": {
            background: DARK_MODE.Accent,
            transition: "background 0.3s ease",
            opacity: 0.7,
          },
        }}
      >
        <ListItemButton onClick={() => navigate(`${ROUTES.profile}`)}>
          <ListItemIcon>
            <PersonIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>
      {/*----------------- 2 -------------------*/}
      <ListItem
        disablePadding
        sx={{
          fontWeight: "bold",
          bgcolor: path === ROUTES.cart ? DARK_MODE.Accent : null,
          color: "white",
          cursor: "pointer",
          "&:hover": {
            background: DARK_MODE.Accent,
            transition: "background 0.3s ease",
            opacity: 0.7,
          },
        }}
      >
        <ListItemButton onClick={() => navigate(`${ROUTES.cart}`)}>
          <ListItemIcon>
            <ShoppingCartIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary={`My Cart - ${getCartCount()} - `} />
        </ListItemButton>
      </ListItem>
      {/*----------------- 3 -------------------*/}
      <ListItem
        disablePadding
        sx={{
          fontWeight: "bold",
          bgcolor: path === ROUTES.orders ? DARK_MODE.Accent : null,
          color: "white",
          cursor: "pointer",
          "&:hover": {
            background: DARK_MODE.Accent,
            transition: "background 0.3s ease",
            opacity: 0.7,
          },
        }}
      >
        <ListItemButton onClick={() => navigate(`${ROUTES.orders}`)}>
          <ListItemIcon>
            <AssignmentIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary={`My Orders`} />
        </ListItemButton>
      </ListItem>
      {/*----------------- Employees Only -------------------*/}
      {user.isEmployee ? (
        <>
          <Divider sx={{ color: "red", width: "75%", margin: "0 auto" }}>
            EMPLOYEES
          </Divider>
          <EmployeeDrawer
            user={user}
            path={path}
            ROUTES={ROUTES}
            navigate={navigate}
            theme={theme}
            DARK_MODE={DARK_MODE}
          />
        </>
      ) : null}
      {/*----------------- Manager Only -------------------*/}
      {user.isManager ? (
        <>
          <Divider sx={{ color: "red", width: "75%", margin: "0 auto" }}>
            MANAGER
          </Divider>
          <ManagerDrawer
            user={user}
            path={path}
            ROUTES={ROUTES}
            navigate={navigate}
            theme={theme}
            DARK_MODE={DARK_MODE}
          />
        </>
      ) : null}
      {/*----------------- Manager Only -------------------*/}
      {!user ? null : (
        <>
          {/*----------------- 1 -------------------*/}
          <ListItem
            disablePadding
            sx={{
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              "&:hover": {
                background: DARK_MODE.Accent,
                transition: "background 0.3s ease",
                opacity: 0.7,
              },
            }}
          >
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon
                  sx={{
                    color: "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </>
  );
};

export default UserDrawer;
