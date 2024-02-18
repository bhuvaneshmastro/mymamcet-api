import mongoose from "mongoose";

const batch = new mongoose.Schema({
    batchName: {
        type: String,
        require: true,
    },
    semesters: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'semesters'
            }
        ],
        default: null,
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
    regulation: {
        type: String,
        require: true
    },
    logs: {
        type: [],
        require: true,
    },
    program: {
        type: String,
        require: true
    },
    students: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'students'
        }],
    },
    department: {
        type: String
    }
});

export const Batch = mongoose.model('batches', batch);