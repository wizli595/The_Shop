//  import all
import mongoose from "mongoose";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/UserModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
// env file config
dotenv.config();
//  connect to DB
connectDB();
// empty the data && and seed it up
const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProds = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProds);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
// destroy all data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data Destroy!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
// controlling the flag on the command
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
