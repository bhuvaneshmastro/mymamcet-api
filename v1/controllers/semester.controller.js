import expressAsyncHandler from "express-async-handler";
import { semesterModel } from "../models/Semester.js";
import { addTimestamp } from "../services/addTimestamps.js";
import { Batch } from "../models/Batch.js";
import { MongoDB } from "../services/Log.js";

const add = expressAsyncHandler(async(req, res) => {
    try {
        const {program, department, batchName, semester, academicYear, courseName, regulation, subjects, assignedFaculties} = req.body;
        const doesSemesterExist = await semesterModel.findOne({program, department, batchName, semester})
        if(doesSemesterExist){
            return res.status(409).json({success: false, message: "Semester exist with same batch and semester"});
        }
        else{
            const batch = await Batch.findOne({program, department, courseName, regulation, batchName})
            if(!batch){
                return res.status(404).json({success: false, message: "Batch not exist with our records"})
            }
            const semesterAddedResult =  await semesterModel.create({batch: batch._id, semester, academicYear, regulation, subjects, assignedFaculties});
            batch.semesters.push(semesterAddedResult._id);
            await MongoDB.updateOne(req, batch, 'batch', Batch)
            return res.status(200).json({success: true, message: "Semester added successfully"})
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const getsem =expressAsyncHandler( async (req, res) => {
    try {
        const doesSemesterExist = await semesterModel.find();
         console.log(doesSemesterExist)
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

const editSem = expressAsyncHandler(async (req, res) => {
    try {
        const semId = req.body._id; // Assuming _id is sent in the request body
        const data = await semesterModel.findOne({_id: semId});
        
        if (!data) {
            return res.status(404).json({success: false, message: "Semester not found"});
        }

        // body <- {lastModified: ""}
        const newData = addTimestamp(req.body)
        // Update the semester fields with the new data
        const updatedSem = await semesterModel.findByIdAndUpdate(semId, newData, {new: true});
        
        return res.status(200).json({success: true, message: "Semester updated successfully", data: updatedSem});
    } catch (err) {
        console.error(err);
        return res.status(500).json({success: false, message: "Internal server error! Team working on it to fix"});
    }
});



export{
    add , 
    getsem, 
    editSem
}