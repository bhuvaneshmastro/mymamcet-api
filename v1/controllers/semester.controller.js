import expressAsyncHandler from "express-async-handler";
import { semesterModel } from "../models/Semester.js";
import { indiaDate } from "../services/DateAndTime.js";
import { addTimestamp } from "../services/addTimestamps.js";

const add = expressAsyncHandler(async(req, res) => {
    try {
        const data = req.body;
        const doesSemesterExist = await semesterModel.findOne({program: data.program, department: data.department, batchName: data.batchName, semester: data.semester})
        if(doesSemesterExist){
            return res.status(409).json({success: false, message: "Semester exist with same batch and semester"});
        }
        else{
              await semesterModel.create(data);
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