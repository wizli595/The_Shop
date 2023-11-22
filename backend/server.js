import connectDB from "./config/db.js";
import express from "express";
import products from "./data/products.js";
import cors from "cors";
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // React app's url
    credentials: true, // Allow cookies to be sent with requests from the client
  })
);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((e) => e._id === id);
  res.json(product);
});
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
