import CryptoJS from "crypto-js";

export const decrypt = (req, res, next) => {
    if (req.body && req.body.data) {
        const cipherText = req.body.data;
        try {
            const bytes = CryptoJS.AES.decrypt(cipherText, process.env.CRYPTO_SECRET_KEY);
            req.body.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            next();
        } catch (error) {
            console.error("Decryption error:", error);
            return res.status(400).json({ error: "Invalid data format" });
        }
    } else {
        next();
    }
};


export const encrypt = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_SECRET_KEY).toString();
    return encryptedData;
}
