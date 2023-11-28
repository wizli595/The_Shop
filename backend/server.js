// all imports
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { errorHandler, notFound } from "./middelware/errorMiddleware.js";
import cookieParser from "cookie-parser";
// Connect to mongoDB
connectDB();
// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parcer middlware
app.use(cookieParser());
// Cors middelware
app.use(
  cors({
    origin: "http://localhost:5173", // React app's url
    credentials: true, // Allow cookies to be sent with requests from the client
  })
);
// @desc Test the api endpoint
// @route GET /
// @access Public
app.get("/", (req, res) => {
  res.send("API is running...");
});
// All Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
// If no route work or the above throw an error
app.use(notFound);
app.use(errorHandler);

// start the app
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
