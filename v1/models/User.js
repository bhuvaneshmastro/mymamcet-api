import mongoose from "mongoose";

const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        require: true,
    }
});

export const userModel = new mongoose.model('userAuthModel', user);