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
    },
    phone: {
        type: Number,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    jobTitle: {
        type: String,
        require: true
    },
    loginEmail: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    }
});

export const userModel = new mongoose.model('userAuthModel', user);