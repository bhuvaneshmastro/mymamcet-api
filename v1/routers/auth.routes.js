import express from 'express';
import { userModel } from '../models/User.js';
import { db } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { generateToken, getUser, verifyToken } from '../services/auth/token.js';
import { Queue } from 'bullmq'
import { decrypt } from '../services/enc_dec/encrypt-decrypt.js';

const authRouter = express.Router();


authRouter.post('/login', decrypt, async function (req, res) {
    try {
        const { email, password } = req.body.data;

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        const passwordMatchResult = bcrypt.compareSync(password, user.password);

        if (!passwordMatchResult) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const payload = {
            uid: user._id,
            role: user.role
        }

        const token = generateToken(payload);
        const cookieName = String(user._id)

        res.cookie(cookieName, token, { 
            expires: new Date(Date.now() + 1000 * 60 * 60), 
            httpOnly: true, 
            sameSite: 'lax' 
        })
        .status(200)
        .json({ success: true, message: 'You have successfully logged in!', role: user.role });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'Unauthorized access' });
    }
});


authRouter.post('/forgot-password', async function (req, res) {
    const { email } = req.body.data;

    try {
        const doesUserExit = db.collection('users').findOne({ email });
        if (!doesUserExit) {
            res.status(404).json({ success: false, message: "Email is not registeres!" });
        }
        const token = generateToken(doesUserExit._id);
        const forgotPasswordSession = db.collection('forgot-password').insertOne({ email: email, createdAt: new Date(Date.now()), expiresAt: new Date(Date.now() + 1000 * 60 * 5), token: token });
        const emailQueue = new Queue('email-queue', {
            connection: {
                host: process.env.AIVEN_HOST,
                port: AIVEN_PORT,
                username: AIVEN_USER,
                password: AVIEN_PASSWORD
            }
        });

        emailQueue.add()
    }
    catch (err) {
        res.status(500).json({ success: false, "message": "Internal server error" });
    }
});

authRouter.get('/logOut', verifyToken, getUser, (req, res) => {
    const user = req.user;
    res.clearCookie(String(user._id), { httpOnly: true}).status(200).json({ success: true, message: 'Logged out successful' })
})

authRouter.post('/register', async function (req, res) {
    const { email, password, role } = req.body;

    const doesUserExit = await db.collection('users').findOne({ email });

    if (doesUserExit) {
        console.log('User already exist!');
        res.status(409).end();
        return
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = userModel({
        email: email,
        password: hashedPassword,
        role: role
    });

    const result = await db.collection('users').insertOne(user);

    // const payload = {
    //     uid: result._id,
    //     role: role
    // }

    // const token = generateToken(payload);
    res.status(201).end();

});

authRouter.post('/change-password', function (req, res) {

});

export { authRouter };