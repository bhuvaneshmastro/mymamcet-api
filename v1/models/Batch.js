import mongoose from "mongoose";

const students = new mongoose.Schema({
    registerNumber: {
        type: Number,
        require: true
    }
})

const batch = new mongoose.Schema({
    batchName: {
        type: String,
        require: true,
    },
    semester: {
        type: String,
        require: true
    },
    academicYear: {
        type: String,
        require: true
    },
    courseName: {
        type: String,
        require: true
    },
    program: {
        type: String,
        require: true
    },
    students: {
        type: [students],
    },
    department: {
        type: String
    }
});

export const batchModel = new mongoose.model('batches', batch);