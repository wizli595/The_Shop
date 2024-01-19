import crypto from "crypto";

const generateRandomToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

export default generateRandomToken;
