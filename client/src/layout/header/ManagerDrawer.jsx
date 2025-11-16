import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
//TODO MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
const ManagerDrawer = ({ path, navigate, ROUTES, DARK_MODE }) => {
  return (
    <>
      {/*----------------- 1 -------------------*/}
      <ListItem
        disablePadding
        sx={{
          fontWeight: "bold",
          bgcolor: path === ROUTES.dashboard ? DARK_MODE.Accent : null,
          color: "white",
          cursor: "pointer",
          "&:hover": {
            background: DARK_MODE.Accent,
            transition: "background 0.3s ease",
            opacity: 0.7,
          },
        }}
      >
        <ListItemButton onClick={() => navigate(`${ROUTES.dashboard}`)}>
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default ManagerDrawer;
