import expressAsyncHandler from "express-async-handler"
import { Batch } from "../models/Batch.js";

const getStudentsAndSemester = expressAsyncHandler(async (req, res) => {
    const { program, department, regulation, courseName, batchName, academicYear, semester } = req.query;

    const batch = await Batch.findOne({ program, department, regulation, courseName, batchName })
        .populate('students', 'registerNumber name')
        .populate({
            path: 'semesters',
            match: { semester: semester }, 
            select: 'program department batchName courseName subjects',
            populate: { path: 'subjects', select: 'program department semester subjectCode subjectCredit subjectName' } // Populate subjects within semesters
        });
    if (!batch) {
        return res.status(404).json({ success: false, message: "Batch not exist with our record" })
    }
    res.status(200).json({ success: true, message: "Done successfully", batch })
})

export {
    getStudentsAndSemester
}