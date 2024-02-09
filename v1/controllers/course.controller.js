import expressAsyncHandler from "express-async-handler";
import { Course } from "../models/Course.js";

const add = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const doesCourseExit = await Course.findOne({ courseName: data.courseName });
        if (!doesCourseExit) {
            const course = new Course(data);
            await course.save();
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
});

const getQuery = expressAsyncHandler(async (req, res, next) => {
    try {
        const allCourses = await Course.find({});
        const courseNames = Array.from(new Set(allCourses.map((course) => course.courseName)));
        const regulations = Array.from(new Set(allCourses.map((course) => course.regulation)));
        const optionCourseNames = courseNames.map((name) => ({ label: name, value: name }))
        const optionRegulation = regulations.map((regulation) => ({ label: regulation, value: regulation }))
        res.status(200).json({ success: true, message: "Course queries fetched successfully", queries: { courseNames, regulations, optionCourseNames, optionRegulation } })
    }
    catch (err) {
        next(err)
    }
})

const all = expressAsyncHandler(async (req, res) => {
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

const details = expressAsyncHandler(async (req, res) => {
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


const edit = expressAsyncHandler(async (req, res) => {
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

const delete1 = expressAsyncHandler(async (req, res) => {
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

export { add, all, details, edit, getQuery, delete1 }