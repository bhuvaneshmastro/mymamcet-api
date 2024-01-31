import express from 'express'
import { decrypt, encrypt } from '../services/enc_dec/encrypt-decrypt.js';
import { db } from '../../config/db.js';
import { ObjectId } from 'mongodb';
const courseRouter = express.Router();

courseRouter.post('/add', decrypt, async (req, res) => {
    try {
        const data = req.body.data;
        const doesCourseExit = await db.collection('courses').findOne({ courseName: data.courseName });
        if (!doesCourseExit) {
            const result = db.collection('courses').insertOne(data);
            return res.status(200).json({ success: true, message: "Course added successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Course already exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

courseRouter.get('/all', async (req, res) => {
    try {
        const doesCourseExit = await db.collection('courses').find({}).toArray();
        if (doesCourseExit) {
            const data = encrypt(doesCourseExit);
            return res.status(200).json({ success: true, message: "All courses fetched successfully", data: data });
        }
        else {
            return res.status(200).json({ success: false, message: "Courses not found" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

courseRouter.post('/details', decrypt, async (req, res) => {
    try {
        const courseId = req.body.data;
        const doesCourseExit = await db.collection('courses').find({ _id: new ObjectId(courseId) }).toArray();
        if (doesCourseExit) {
            const data = encrypt(doesCourseExit);
            console.log(doesCourseExit);
            return res.status(200).json({ success: true, message: "Course details fetched successfully", data: data });
        }
        else {
            return res.status(200).json({ success: false, message: "Course details not found" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

courseRouter.post('/edit', decrypt, async (req, res) => {
    try {
        const data = req.body.data;
        const doesCourseExit = await db.collection('courses').findOne({ _id: new ObjectId(data._id) });
        if (doesCourseExit) {
            const result = await db.collection('courses').updateOne({ _id: new ObjectId(data._id) }, {
                $set: {
                    courseName: data.courseName,
                    regulation: data.regulation,
                    department: data.department,
                    program: data.program,
                },
            });
            return res.status(200).json({ success: true, message: "Course edited successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Course doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

courseRouter.post('/delete', decrypt, async (req, res) => {
    try {
        const courseId = req.body.data;
        const doesCourseExit = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });
        if (doesCourseExit) {
            const result = await db.collection('courses').deleteOne({ _id: new ObjectId(courseId) })
            return res.status(200).json({ success: true, message: "Course deleted successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Course doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

export { courseRouter }