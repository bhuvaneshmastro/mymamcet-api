import expressAsyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../services/auth/token.js";
import { ObjectId } from "mongodb";
import { indiaDate } from "../services/DateAndTime.js";

const login = expressAsyncHandler(async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
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
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: 'lax'
        })
            .status(200)
            .json({ success: true, message: 'You have successfully logged in!', user });
    } catch (error) {
        next(error)
    }
});

const onAuthState = expressAsyncHandler(async function (req, res, next) {
    try {
        const { uid } = req.user;
        const user = await User.findOne({ _id: new ObjectId(uid) }, { projection: { password: 0 } });
        if (!user) {
            return res.status(401).json({ success: false, message: "User does not exist in our record" })
        }
        return res.status(200).json({ success: true, message: "User state has verified", user })
    }
    catch (err) {
        next(err)
    }
})

const forgetPassword = expressAsyncHandler(async function (req, res) {
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

const logout = expressAsyncHandler(async function (req, res) {
    const user = req.user;
    res.clearCookie(String(user.uid), { httpOnly: true }).status(200).json({ success: true, message: 'Logged out successful' })
})

const register = expressAsyncHandler(async function (req, res) {
    const newUserData = req.body;
    const doesUserExit = await User.findOne({ email: newUserData.email });
    if (doesUserExit) {
        return res.status(409).json({ success: false, message: "User with this email is already exist" });
    }

    const hashedPassword = bcrypt.hashSync(newUserData.password, 10);
    const user = new User({
        ...newUserData,
        password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ success: true, message: "User has been added to database" });
});

const changePassword = expressAsyncHandler(async function (req, res) {

});

const change_profile = expressAsyncHandler(async (req, res) => {
    const { uid } = req.user;
    try {
        const user = await User.findOne({_id: new ObjectId(uid)})

        if(!user){
            return res.status(404).json({success: false, message: "User does not exist for changing photo"})
        }
        const result = await User.updateOne(
            { _id: new Object(user._id) },
            { $set: { photo: req.body.url, lastModified: indiaDate.timestamps } }
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ success: true, message: 'Profile photo updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found or profile photo not updated' });
        }
    } catch (err) {
        console.error('Error updating profile photo:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {
    login,
    forgetPassword,
    logout,
    register,
    changePassword,
    onAuthState,
    change_profile
}