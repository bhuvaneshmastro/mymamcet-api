import expressAsyncHandler from "express-async-handler";
import { Course } from "../models/Course.js";
import { ObjectId } from "bson";
import { getID } from "../services/getID.js";
import { MongoDB } from "../services/Log.js";

const add = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const doesCourseExit = await Course.findOne({ courseName: data.courseName, regulation: data.regulation });
        if (!doesCourseExit) {
            await MongoDB.save(req, data, 'course', Course);
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

const all = expressAsyncHandler(async (req, res) => {
    try {
        const doesCourseExit = await Course.find();
        if (doesCourseExit) {
            return res.status(200).json({ success: true, message: "All courses fetched successfully", courses: doesCourseExit });
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
        const courseId = getID(req.path);
        const doesCourseExit = await Course.findOne({ _id: new ObjectId(courseId) });
        if (doesCourseExit) {
            return res.status(200).json({ success: true, message: "Course details fetched successfully", course: doesCourseExit });
        }
        else {
            return res.status(200).json({ success: false, message: "Course details not found" });
        }
    }
    catch (err) {
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})


const edit = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const doesCourseExist = await Course.findOne({ _id: new ObjectId(data._id) });
        if (doesCourseExist) {
            await MongoDB.updateOne(req, data, 'course', Course);
            return res.status(200).json({ success: true, message: "Course edited successfully" });
        } else {
            return res.status(200).json({ success: false, message: "Course doesn't exist" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }));
    }
});

const delete1 = expressAsyncHandler(async (req, res) => {
    try {
        const courseId = getID(req.path)
        const doesCourseExit = await Course.findOne({ _id: new ObjectId(courseId) });
        if (doesCourseExit) {
            const logsId = doesCourseExit.logs;
            await Course.deleteOne({ _id: new ObjectId(courseId) })
            await MongoDB.deleteLogs(logsId)
            return res.status(200).json({ success: true, message: "Course deleted successfully" });
        }
        else {
            return res.status(404).json({ success: false, message: "Course doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

export { add, all, details, edit, delete1 }