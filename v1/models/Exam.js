import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    exam: {
        type: String,
        require: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batches'
    },
    scores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'scores',
        }
    ],
    semester: {
        type: String,
        require: true,
    },
    academicYear: {
        type: String,
        require: true
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