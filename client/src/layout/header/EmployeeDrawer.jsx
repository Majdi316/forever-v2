//TODO MUI Components
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//TODO MUI Icons
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
//TODO Main Function
const EmployeeDrawer = ({ path, navigate, ROUTES, DARK_MODE }) => {
  //TODO Return
  return (
    <>
      {/*----------------- 1 -------------------*/}
      <ListItem
        disablePadding
        sx={{
          fontWeight: "bold",
          bgcolor: path === ROUTES.addNewProduct ? DARK_MODE.Accent : null,
          color: "white",
          cursor: "pointer",
          "&:hover": {
            background: DARK_MODE.Accent,
            transition: "background 0.3s ease",
            opacity: 0.7,
          },
        }}
      >
        <ListItemButton onClick={() => navigate(`${ROUTES.addNewProduct}`)}>
          <ListItemIcon>
            <ControlPointIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItemButton>
      </ListItem>
      {/*----------------- 2 -------------------*/}
      <ListItem
        disablePadding
        sx={{
          fontWeight: "bold",
          bgcolor: path === ROUTES.myProducts ? DARK_MODE.Accent : null,
          color: "white",
          cursor: "pointer",
          "&:hover": {
            background: DARK_MODE.Accent,
            transition: "background 0.3s ease",
            opacity: 0.7,
          },
        }}
      >
        <ListItemButton onClick={() => navigate(`${ROUTES.myProducts}`)}>
          <ListItemIcon>
            <TurnedInNotIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="My Products" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default EmployeeDrawer;
