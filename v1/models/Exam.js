import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true,
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

export const Exam = mongoose.model('exams', examSchema);