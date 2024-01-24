import express from 'express';
import mongoose from 'mongoose';
import { userModel } from '../models/User.js';
import { db } from '../../config/db.js';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authRouter = express.Router();

authRouter.post('/login', async function(req, res){
    try {
        const { email, password } = req.body;

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

       const passwordMatchResult = bcrypt.compareSync(hashedPassword, user.password)

        if (passwordMatchResult) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const payload = {
            uid: user._id,
            role: user.role
        }

        const Token = JWT.sign(payload, 'welcometomymamcet');

        // Passwords match, you can proceed with authentication logic

        res.cookie("token", JSON.stringify(Token), {httpOnly: true}).json({ success: true });
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Internal server error' });
    }
});

authRouter.post('/forgot-password', function(req, res){

});

authRouter.post('/register', async function(req, res){
    const {email, password, role} = req.body;

    const doesUserExit = await db.collection('users').findOne({email});
    
    if(doesUserExit){
        console.log('User already exist!');
        res.status(409).end();
        return
    }

    const user = userModel({
        email: email,
        password: password,
        role: role
    });

    const result = await db.collection('users').insertOne(user);

    console.log(result);

    res.end();

});

authRouter.post('/change-password', function(req, res){

});

export {authRouter};