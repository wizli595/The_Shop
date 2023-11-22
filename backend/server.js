import express from "express";
import products from "./data/products.js";
const app = express();
const PORT = 5000;
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
  console.log("App running on port" + PORT);
});
