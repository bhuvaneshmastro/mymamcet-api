import mongoose from "mongoose";
import { indiaDate } from "../services/DateAndTime.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        require: true,
        enum: ['admin', 'professor', 'office']
    },
    phone: {
        type: String,
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
    photo: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        require: true,
        default: false,
    },
    address: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        default: ()=> indiaDate.timestamps
    },
    lastModified: {
        type: String,
        default: ()=> indiaDate.timestamps
    }
});

export const User = mongoose.model('users', userSchema);