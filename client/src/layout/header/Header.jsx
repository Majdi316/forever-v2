//TODO Libraries
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//TODO Components
import AppBarPage from "./AppBarPage";
import DrawerPage from "./DrawerPage";
import ROUTES from "../../routes/routesData";

//TODO Main Function
const Header = ({ drawerWidth }) => {
  //TODO Variables
  const currentLocation = useLocation();
  //TODO States
  const [noneOrBlock, setNoneOrBlock] = useState("none");
  const [drawerType, setDrawerType] = useState("permanent");
  const [path, setPath] = useState("");
  //TODO Functions
  const showDrawer = () => {
    setDrawerType("temporary");
    setNoneOrBlock("block");
  };
  const hideDrawer = () => {
    setDrawerType("permanent");
    setNoneOrBlock("none");
  };

  //TODO useEffect
  useEffect(() => {
    switch (currentLocation.pathname) {
      case "/":
        setPath(ROUTES.root);
        break;
      case "/about":
        setPath(ROUTES.about);
        break;
      case "/register":
        setPath(ROUTES.register);
        break;
      case "/login":
        setPath(ROUTES.login);
        break;
      case "/user/profile":
        setPath(ROUTES.profile);
        break;
      case "/manager/dashboard":
        setPath(ROUTES.dashboard);
        break;
      case "/collection":
        setPath(ROUTES.collection);
        break;
      case "/contact-us":
        setPath(ROUTES.contactUs);
        break;
      case "/user/my-cart":
        setPath(ROUTES.cart);
        break;
      case "/user/my-orders":
        setPath(ROUTES.orders);
        break;
      case "/employees/add-new-product":
        setPath(ROUTES.addNewProduct);
        break;
      default:
    }
  }, [currentLocation]);
  //TODO Return
  return (
    <>
      <AppBarPage drawerWidth={drawerWidth} showDrawer={showDrawer} />
      <DrawerPage
        drawerWidth={drawerWidth}
        displayMenu={noneOrBlock}
        drawerType={drawerType}
        hideDrawer={hideDrawer}
        path={path}
      />
    </>
  );
};

export default Header;
