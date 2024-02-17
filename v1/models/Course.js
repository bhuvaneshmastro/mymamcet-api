import mongoose from "mongoose";
import { indiaDate } from '../services/DateAndTime.js'

const course = new mongoose.Schema({
    courseName: {
        type: String,
        require: true,
    },
    regulation: {
        type: String,
        require: true,
    },
    department: {
        type: String,
        require: true,
    },
    program: {
        type: String,
        require: true,
    },
    logs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'logs'
        }],
        require: true,
    },
    isFinalize: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: () => indiaDate.timestamps
    },
    lastModified: {
        type: String,
        default: () => indiaDate.timestamps
    }
});

export const Course = mongoose.model('courses', course);