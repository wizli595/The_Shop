import express from "express";
import { sendContactEmail } from "../utils/emailFunctions.js";
const router = express.Router();

// @desc Submit contact form
// @route POST /api/contact
// @access Public
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  sendContactEmail(name, email, message);
  res.status(200).json({ message: "Contact form submitted successfully" });
});

export default router;
