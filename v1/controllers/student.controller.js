import { Student } from "../models/Student.js";

export const addStudent = async (students) => {
    try {
        console.log(students);
    }
    catch (err) {
        console.error("Error while adding students:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({success: true, message: "Students fetched successfully", students})
    }
    catch (err) {
        console.error("Error while adding students:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}