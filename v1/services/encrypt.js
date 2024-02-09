import CryptoJS from "crypto-js";

export const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_SECRET_KEY).toString();
    return encryptedData;
}