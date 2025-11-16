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
  // ------------- employees routes ----------
  addNewProduct: "/employees/add-new-product",
  // ------------- manager routes ----------
  dashboard: "/manager/dashboard",
  createHeroSection: "/manager/create-hero-section",
  updateHeroSection: "/manager/update-hero-section/:id",
  manageOrders: "/manager/manage-orders",
};
export default ROUTES;
