import express from 'express';
import { db } from '../../config/db.js';
// import { addSemester } from '../controllers/semester/addSemester.js';
const semesterRouter = express.Router()

semesterRouter.post('/add', async(req, res) => {
    try {
        const data = req.body.data;
        const doesSemesterExist = await db.collection('semesters').findOne({program: data.program, department: data.department, batchName: data.batchName, semester: data.semester})
        if(doesSemesterExist){
            console.log(doesSemesterExist);
            return res.status(409).json({success: false, message: "Semester exist with same batch and semester"});
        }
        else{
            await db.collection('semesters').insertOne(data);
            return res.status(200).json({success: true, message: "Semester added successfully"})
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

semesterRouter.get('/getSemester', async (req, res) => {
    try {
        const program = req.query.program;
        const department = req.query.department;
        const batchName = req.query.batchName;

        if (!program || !department || !batchName) {
            return res.status(400).json({ success: false, message: "Missing required parameters" });
        }

        const doesSemesterExist = await db.collection('semesters').findOne({ program, department, batchName });

        if (!doesSemesterExist) {
            return res.status(404).json({ success: false, message: "Semester does not exist with this batch" });
        } else {
            return res.status(200).json({ success: true, message: "Semester fetched successfully", data: doesSemesterExist });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error! Team working on it to fix" });
    }
});


export { semesterRouter }