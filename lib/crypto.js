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

export function generateToken() {
  const randomBytes = CryptoJS.lib.WordArray.random(32); // 32 bytes = 256 bits
  return CryptoJS.enc.Base64.stringify(randomBytes);
}

export function hashToken(token) {
  return CryptoJS.SHA256(token).toString(CryptoJS.enc.Hex);
}


