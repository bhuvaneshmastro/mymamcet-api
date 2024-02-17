import mongoose from "mongoose";
import { indiaDate } from "../services/DateAndTime.js";

const subjectSchema = new mongoose.Schema({
    program: {
        type: String,
        require: true
    } ,
    department: {
        type: String,
        require: true,
    },
    regulation: {
        type: String,
        require: true
    },
    subjectCode: {
        type: String,
        require: true,
        trim: true,
        uppercase: true,
        unquie: true
    },
    subjectName: {
        type: String,
        require: true,
    },
    subjectCredit: {
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
    createdAt: {
        type: String,
        default: ()=> indiaDate.timestamps
    },
    lastModified: {
        type: String,
        default: ()=> indiaDate.timestamps
    }
})

export const Subject = new mongoose.model('subjects', subjectSchema);