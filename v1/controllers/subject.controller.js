import expressAsyncHandler from "express-async-handler";
import { Subject } from "../models/Subject.js";
import { getID } from "../services/getID.js";
import { MongoDB } from '../services/Log.js'
import { indiaDate } from "../services/DateAndTime.js";
import { ObjectId } from "bson";

const add = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const doesSubjectExit = await Subject.findOne({ subjectCode: data.subjectCode });
        if (!doesSubjectExit) {
            await MongoDB.save(req, data, 'subject', Subject)
            return res.status(200).json({ success: true, message: "Subject added successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject already exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const all = expressAsyncHandler(async (req, res) => {
    try {
        const doesSubjectExit = await Subject.find();
        if (doesSubjectExit) {
            return res.status(200).json({ success: true, message: "All subjects fetched successfully", subjects: doesSubjectExit });
        }
        else {
            return res.status(200).json({ success: false, message: "Subjects not found" });
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
        const doesSubjectExit = await Subject.findOne({ _id: new ObjectId(courseId) });
        if (doesSubjectExit) {
            return res.status(200).json({ success: true, message: "Subject details fetched successfully", subject: doesSubjectExit });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject details not found" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const edit = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const doesSubjectExit = await Subject.findOne({ _id: new ObjectId(data._id) });
        if (doesSubjectExit) {
            await MongoDB.updateOne(req, data, 'subject', Subject)
            return res.status(200).json({ success: true, message: "Subject edited successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const delete1 = expressAsyncHandler(async (req, res) => {
    try {
        const courseId = getID(req.path);
        const doesSubjectExit = await Subject.findOne({ _id: new ObjectId(courseId) });
        if (doesSubjectExit) {
            const result = await Subject.deleteOne({ _id: new ObjectId(courseId) })
            return res.status(200).json({ success: true, message: "Subject deleted successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
export {
    add,
    all,
    delete1,
    edit,
    details
}