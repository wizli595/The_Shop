// all imports
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middelware/errorMiddleware.js";
// connect to mongoDB
connectDB();
// initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
// use all requirement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
// all Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
// if no route work or the above throw an error
app.use(notFound);
app.use(errorHandler);

// start the app
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
