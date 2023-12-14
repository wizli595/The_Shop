import CryptoJs from "crypto-js";

const secretKey = "HIIHNIUPNPO";

const encryptObj = (obj) => {
  const ciphertext = CryptoJs.AES.encrypt(
    JSON.stringify(obj),
    secretKey
  ).toString();
  return ciphertext;
};
const decryptObj = (ciphertext) => {
  const bytes = CryptoJs.AES.decrypt(ciphertext, secretKey);
  const decryptedObj = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
  return decryptedObj;
};
export { encryptObj, decryptObj };
