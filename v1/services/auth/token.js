import JWT from 'jsonwebtoken';
import { db } from '../../../config/db.js'
import { ObjectId } from 'mongodb';

function generateToken(payload) {
    const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' });
    return token;
}

const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.cookie) {
            const cookies = req.headers.cookie;
            const token = cookies.split("=")[1];

            if (!token) {
                return res.status(404).json({ "success": false, "message": "No token found", user: false });
            }           

            JWT.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(400).json({ "success": false, "message": "Invalid token", user: false });
                }
                req.user = true;
                req.id = user.uid;
                next();
            });
        }
        else {
            req.user = false;
            next();
        }
    }
    catch (err) {
        console.error("Error encoutered: ", err.message)
        return res.status(500).json({ success: false, message: "Internal server error", user: false })
    }

}

const getUser = async (req, res, next) => {
    if (req.user) {
        const uid = await req.id;
        try {
            const user = await db.collection('users').findOne({ _id: new ObjectId(uid) }, { projection: { password: 0 } });

            if (!user) {
                return res.status(404).json({ "success": false, "message": "User not found" });
            }
            req.user = user;
            next();
        } catch (err) {
            console.error("Error encoutered: ", err.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
    else {
        next();
    }
}

export { generateToken, verifyToken, getUser };