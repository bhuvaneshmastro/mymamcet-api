import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        require: true
    },
    score: {
        type: Number,
        require: true
    },
    exam: {
        type: String,
        require: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'subjects'
    },
    isPass: {
        type: String,
        require: true,
        default: 'Pass'
    },
    passingYear: {
        type: String,
        default: null
    },
    logs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'logs'
        }],
        require: true,
    },
})

export const Scores = mongoose.model('scores', scoreSchema);