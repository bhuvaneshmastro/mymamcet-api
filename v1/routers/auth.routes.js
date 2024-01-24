import express from 'express';
import mongoose from 'mongoose';
import { userModel } from '../models/User.js';
import { db } from '../../config/db.js';

const authRouter = express.Router();

authRouter.post('/login', function(req, res){
    
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