// all imports
import path from "path";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadsRoute from "./routes/uploadRoute.js";
import { errorHandler, notFound } from "./middelware/errorMiddleware.js";
import cookieParser from "cookie-parser";

connectDB(); // Connect to mongoDB

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

// All Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/uploads", uploadsRoute);

// PayPal route
app.get("/api/config/paypal", (req, res) => {
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use("/uploads", express.static("/var/data/uploads"));

  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();

  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// If no route work or the above throw an error
app.use(notFound);
app.use(errorHandler);

// start the app
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
