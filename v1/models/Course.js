import mongoose from "mongoose";
import { indiaDate } from '../services/DateAndTime.js'

const course = new mongoose.Schema({
    courseName: {
        type: String,
        unique: true,
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