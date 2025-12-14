const ROUTES = {
  root: "/",
  about: "/about",
  collection: "/collection",
  contactUs: "/contact-us",
  ProductInfo: "/products/product-info/:id",
  // ------------- auth routes ----------
  login: "/login",
  register: "/register",
  verificationEmail: "/user/verify-email",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:resetPasswordToken",
  // ------------- users routes ----------
  profile: "/user/profile",
  cart: "/user/my-cart",
  placeOrder: "/user/place-order",
  verify: "/verify",
  orders: "/user/my-orders",
  favorite: "user/my-favorite/products",
  updateProfile: "/users/profile/update/:id",
  // ------------- employees routes ----------
  addNewProduct: "/employees/add-new-product",
  updateProduct: "/employee/update-product/:id",
  myProducts: "/employee/my-products",
  // ------------- manager routes ----------
  dashboard: "/manager/dashboard",
  createHeroSection: "/manager/create-hero-section",
  updateHeroSection: "/manager/update-hero-section/:id",
  manageOrders: "/manager/manage-orders",
  allUsers: "/manager/all-users",
  userDetails:"/manager/user-details/:id"
};
export default ROUTES;
