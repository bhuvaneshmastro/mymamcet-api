import mongoose from "mongoose";
import { indiaDate } from "../services/DateAndTime.js";

const student = new mongoose.Schema({
    registerNumber: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    personalEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        require: true
    },
    fathersName: {
        type: String,
        require: true
    },
    fathersPhone: {
        type: String,
        require: true
    },
    mothersName: {
        type: String,
        require: true
    },
    mothersPhone: {
        type: String,
        require: true
    },
    _10thMark: {
        type: Number,
        require: true
    },
    _12thMark: {
        type: Number,
        require: true
    },
    logs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'logs'
        }],
        require: true,
    },
    examScores: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: 'scores'
        }],
        default: null
    },
    counsellingApplicationNumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        default: () => indiaDate.timestamps
    },
    lastModified: {
        type: String,
        default: () => indiaDate.timestamps
    }
})

export const Student = mongoose.model('students', student)