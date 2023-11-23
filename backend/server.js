import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // React app's url
    credentials: true, // Allow cookies to be sent with requests from the client
  })
);

app.get("/", (req, res) => {
  console.log("jhjj");
  res.send("API is running...");
});
app.use("/api/products", productRoute);
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
