import { Router } from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserByID,
  logoutUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middelware/authMiddleware.js";
// import cmi from "cmi-payment-nodejs";
const router = new Router();
const protectMiddleware = protect;
const adminMiddleware = admin;
// in main route if is it GET get all users (admin)
//  if is it POST register a user
// const funcs = (req, res) => {
//   // Extract necessary information from the request query parameters
//   // const { amount, email, tel, BillToName } = req.query;

//   // Initialize the CMI payment client with your configuration
//   const CmiClient = new cmi.default({
//     storekey: "YOUR_STOREKEY", // Your CMI Store Key
//     clientid: "YOUR_CLIENTID", // Your CMI Client ID
//     oid: "UNIQUE_COMMAND_ID", // A unique command ID
//     shopurl: "https://your-shop-url.com", // Your shop's URL for redirection
//     okUrl: "https://your-success-redirect-url.com", // Redirection after a successful payment
//     failUrl: "https://your-failure-redirect-url.com", // Redirection after a failed payment
//     email: "admin@email.com", // email for CMI platform
//     BillToName: "555", // name as it should appear on the CMI platform
//     amount: "5600", // The amount to be paid
//     callbackURL: "https://your-callback-url.com", // Callback URL for payment confirmation
//     tel: 5555, // phone number for the CMI platform
//   });

//   // Generate an HTML form for the CMI payment
//   const htmlForm = CmiClient.redirect_post();

//   // Send the HTML form as the response
//   console.log(CmiClient);
//   res.send(htmlForm);
// };.get(funcs)
router
  .route("/")
  .post(registerUser)
  .get(protectMiddleware, adminMiddleware, getUsers);

// login route (email,password)
router.post("/auth", authUser);

// logout destroy token && coockie
router.post("/logout", logoutUser);

// profile if GET get user profile
// if PUT update user profile
router
  .route("/profile")
  .get(protectMiddleware, getUserProfile)
  .put(protectMiddleware, updateUserProfile);

// route with id params
// if DELETE delete  user by ID
// if GET get  user by ID
// if PUT update user by ID
router
  .route("/:id")
  .delete(protectMiddleware, adminMiddleware, deleteUser)
  .get(protectMiddleware, adminMiddleware, getUserByID)
  .put(protectMiddleware, adminMiddleware, updateUser);

export default router;
