import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        require: true
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exams',
        require: true
    },
    score: {
        type: Number,
        require: true
    },
    isPass: {
        type: String,
        require: true,
        default: 'Pass'
    },
    logs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'logs'
        }],
        require: true,
    },
})

export const Exam = mongoose.model('exams', scoreSchema);