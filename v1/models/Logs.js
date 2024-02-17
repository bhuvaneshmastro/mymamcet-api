import mongoose from "mongoose";
import { indiaDate } from "../services/DateAndTime.js";

const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    collectionName: {
        type: String,
        require: true,
    },
    message: {
        type: Number,
        require: true
    },
    changes: {
        type: [],
        require: true,
    },
    timestamps: {
        type: String,
        default: ()=> indiaDate.timestamps
    }
})

export const Log = mongoose.model('logs', logSchema);