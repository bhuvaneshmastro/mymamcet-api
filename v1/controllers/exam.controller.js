import expressAsyncHandler from "express-async-handler"
import { Batch } from "../models/Batch.js";
import { Exam } from "../models/Exam.js";
import { semesterModel } from "../models/Semester.js";
import { Subject } from "../models/Subject.js";
import { Scores } from "../models/Score.js";
import { MongoDB } from '../services/Log.js'
import { ObjectId } from "mongodb";

const getStudentsAndSemester = expressAsyncHandler(async (req, res) => {
    const { program, department, regulation, courseName, batchName, academicYear, semester, exam } = req.query;
    const existBatch = await Batch.findOne({ program, department, regulation, courseName, batchName })
        .populate('students', 'registerNumber name')
        .populate({
            path: 'semesters',
            match: { semester: semester },
            select: 'program department batchName courseName subjects assignedFaculties',
            populate: { path: 'subjects', select: 'program department semester subjectCode subjectCredit subjectName shortName type' } // Populate subjects within semesters
        });

    if (!existBatch) {
        return res.status(404).json({ success: false, message: "Batch does not exist in our records" });
    }

    const semesterExist = await semesterModel.findOne({ batch: existBatch._id, academicYear, semester, regulation });
    if (!semesterExist || existBatch.semesters <= 0) {
        return res.status(404).json({ success: false, message: "Semester for this batch does not exist" });
    }

    let examId;
    const doesExamExist = await Exam.findOne({ batch: existBatch._id, academicYear, semester, exam });
    if (!doesExamExist) {
        const examObject = {
            exam,
            batch: existBatch._id,
            semester,
            academicYear
        };
        const addedExam = await MongoDB.save(req, examObject, 'exam', Exam);
        existBatch.exams.push(addedExam._id);
        examId = addedExam._id;
        await MongoDB.updateOne(req, existBatch, 'batch', Batch);
    } else {
        examId = doesExamExist._id; // Assigning examId if the exam already exists
    }

    if (!examId) {
        return res.status(404).json({ success: false, message: "Exam does not exist" });
    }

    const batch = await Batch.findOne({ program, department, regulation, courseName, batchName })
        .populate('students', 'registerNumber name')
        .populate({
            path: 'semesters',
            match: { semester: semester },
            select: 'program department batchName courseName subjects assignedFaculties',
            populate: { path: 'subjects', select: 'program department semester subjectCode subjectCredit subjectName shortName type' } // Populate subjects within semesters
        })
        .populate({
            path: 'exams',
            match: { _id: examId },
            select: 'exam semester academicYear',
            populate: {
                path: 'scores',
                select: 'student score subject isPass exam passingYear'
            }
        });

    res.status(200).json({ success: true, message: "Operation successful", batch });
});

const updateScore = expressAsyncHandler(async (req, res) => {
    try {
        const { marks, examId } = req.body;
        const examDocument = await Exam.findOne({ _id: new ObjectId(examId) });

        console.log(marks);

        if (marks.length <= 0) {
            return res.status(400).json({ success: false, message: 'Marks not found in the request' });
        }

        if (!examDocument) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }

        let updatedScores = [];

        for (const scoreData of marks) {
            const existingScore = await Scores.findOneAndUpdate(
                { exam: scoreData.exam, subject: scoreData.subject, student: scoreData.student },
                { $set: { score: scoreData.score, passingYear: scoreData.passingYear } },
                { new: true }
            );

            if (!existingScore) {
                return res.status(404).json({ success: false, message: 'Score not found' });
            }

            updatedScores.push(existingScore);
        }

        res.status(200).json({ success: true, message: 'Scores updated successfully', updatedScores });
    } catch (error) {
        console.error('Error updating scores:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


const addScore = expressAsyncHandler(async(req, res)=> {
    try {
        const { marks, examId } = req.body;
        const examDocument = await Exam.findOne({ _id: new ObjectId(examId) });

        if(marks.length <= 0){
            return res.status(400).json({ success: false, message: 'Marks not found in the request' });
        }
        
        if (!examDocument) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }

        let scores = [];
        console.log(marks);

        for (const scoreData of marks) {
            const existScore = await Scores.findOne({exam: scoreData.exam, subject: scoreData.subject, student: scoreData.student})

            if(existScore){
                return res.status(409).json({ success: false, message: `Score exist: Exam: ${scoreData.exam}` });
            }
            const score = new Scores(scoreData);
            const storedScore = await score.save();
            examDocument.scores.push(storedScore._id);
            scores.push(storedScore)
        }

        // Save the examDocument to update the scores array
        await examDocument.save();
        res.status(200).json({success: true, message: 'Scores saved successfully', scores });
    } catch (error) {
        console.error('Error saving scores:', error);
        res.status(500).json({success: false, message: 'Internal server error' });
    }
});


export {
    getStudentsAndSemester,
    addScore,
    updateScore
}