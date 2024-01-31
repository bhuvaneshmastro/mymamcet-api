import mongoose from "mongoose";

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
});

export const courseModel = new mongoose.model('courses', course);