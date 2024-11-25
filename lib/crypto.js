// utils/crypto.js
import CryptoJS from 'crypto-js';

const secretKey = process.env.CRYPTO_SECRET_KEY;

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
