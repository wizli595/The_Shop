// all imports
import express from "express";
import colors from "colors";
import listEndpoints from "express-list-endpoints";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { errorHandler, notFound } from "./middelware/errorMiddleware.js";

const app = express();

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
const routes = listEndpoints(app);
const title =
  "Method".padEnd(20).blue + "Path".padEnd(50).red + "Controllers".green;
console.log(title.bgWhite);
console.log("=".repeat(title.length));

routes.forEach((route) => {
  const methods = route.methods.join("|");
  const path = route.path;
  let controllerPath = getControllerPath(route);
  if (path === "/") controllerPath = "server".green;
  console.log(
    `${methods.padEnd(20).blue} ${path.padEnd(50).red} ${controllerPath}`
  );
});

function getControllerPath(route) {
  // Extracting the controller file name from the path
  const controllerFileName = pathToController(route.path);
  const controllerFilePath = `controllers/${controllerFileName}Controller`;

  return controllerFilePath.green;
}

function pathToController(path) {
  // Extract the part between the last '/' and the end or before parameters
  const matches = path.split("/");
  return matches ? matches[2] : "";
}
