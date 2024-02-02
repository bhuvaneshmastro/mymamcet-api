import express from 'express';
import { db } from '../../config/db.js';
// import { addSemester } from '../controllers/semester/addSemester.js';
const semesterRouter = express.Router()

semesterRouter.post('/add', async(req, res) => {
    try {
        const data = req.body.data;
        await db.collection('semesters').insertOne(data);
        res.status(200).json({success: true, message: "Semester added successfully"})
    }
    catch (err) {
        console.error(err);
        res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

export { semesterRouter }