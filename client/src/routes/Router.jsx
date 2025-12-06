//TODO Libraries
import { Route, Routes } from "react-router-dom";
//TODO Global Variables
import ROUTES from "./routesData";
//TODO Components
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerificationEmail from "../pages/VerificationEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import About from "../pages/About";
import Profile from "../pages/users/Profile";
import Dashboard from "../pages/manager/Dashboard";
import UpdateHeroForm from "../components/manager/UpdateHeroForm";
import CreateHero from "../components/manager/CreateHero";
import Collection from "../pages/Collection";
import ContactUs from "../pages/ContactUs";
import ProductInfo from "../pages/ProductInfo";
import Cart from "../pages/users/Cart";
import PlaceOrder from "../pages/users/PlaceOrder";
import Verify from "../pages/users/Verify";
import Orders from "../pages/users/Orders";
import ManageOrders from "../pages/manager/ManageOrders";
import AddProduct from "../pages/employees/AddProduct";
import UpdateProduct from "../components/employee/UpdateProduct";
import EmployeeProducts from "../pages/employees/EmployeeProducts";
import FavoriteProducts from "../pages/users/FavoriteProducts";
import UpdateProfile from "../components/users/UpdateProfile";
//TODO Main Function
const Router = () => {
  //TODO Return
  return (
    <Routes>
      <Route path={ROUTES.root} element={<Home />} />
      <Route path={ROUTES.about} element={<About />} />
      <Route path={ROUTES.collection} element={<Collection />} />
      <Route path={ROUTES.contactUs} element={<ContactUs />} />
      <Route path={ROUTES.ProductInfo} element={<ProductInfo />} />
      {/* ----------- AUTH ROUTES ------------  */}
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.register} element={<Register />} />
      <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
      <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
      <Route path={ROUTES.verificationEmail} element={<VerificationEmail />} />
      {/* ----------- USERS ROUTES ------------  */}
      <Route path={ROUTES.profile} element={<Profile />} />
      <Route path={ROUTES.cart} element={<Cart />} />
      <Route path={ROUTES.placeOrder} element={<PlaceOrder />} />
      <Route path={ROUTES.verify} element={<Verify />} />
      <Route path={ROUTES.orders} element={<Orders />} />
      <Route path={ROUTES.favorite} element={<FavoriteProducts />} />
      <Route path={ROUTES.updateProfile} element={<UpdateProfile />} />
      {/* ----------- EMPLOYEES ROUTES ------------  */}
      <Route path={ROUTES.addNewProduct} element={<AddProduct />} />
      <Route path={ROUTES.updateProduct} element={<UpdateProduct />} />
      <Route path={ROUTES.myProducts} element={<EmployeeProducts />} />
      {/* ----------- MANAGER ROUTES ------------  */}
      <Route path={ROUTES.dashboard} element={<Dashboard />} />
      <Route path={ROUTES.updateHeroSection} element={<UpdateHeroForm />} />
      <Route path={ROUTES.createHeroSection} element={<CreateHero />} />
      <Route path={ROUTES.manageOrders} element={<ManageOrders />} />
    </Routes>
  );
};

export default Router;
