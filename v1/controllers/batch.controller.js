import expressAsyncHandler from "express-async-handler";
import { Batch } from "../models/Batch.js";
import { MongoDB } from "../services/Log.js";
import { ObjectId } from "mongodb";
import { getID } from "../services/getID.js";
import { Student } from "../models/Student.js";
import { semesterModel } from "../models/Semester.js";

const details2 = expressAsyncHandler(async (req, res) => {
    try {
        const batchId = getID(req.path);
        if(!batchId){
            res.status(404).json({success: false, message: "Batch id not exist"})
        }
        const batch = await Batch.findOne({ _id: new ObjectId(batchId) }).populate('students', 'registerNumber name dob phone email fathersName mothersName fathersPhone mothersPhone address _10thMark _12thMark counsellingApplicationNumber')

        if (!batch) {
            return res.status(404).json({ success: false, message: "Batch does not exist" });
        }

        res.status(200).json({
            success: true,
            message: "Batch details fetched successfully",
            batch: batch
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const deleteBatch = expressAsyncHandler(async (req, res)=>{
    try{
        const batchId = getID(req.path)
        const batch = await Batch.findOne({_id: new ObjectId(batchId)})
        if(batch){
            const semestersId = batch.semesters;
            const studentsId = batch.students;
            await MongoDB.deleteMany(studentsId, Student)
            // if(batch.semesters > 0){
            //     await MongoDB.deleteMany(semestersId, semesterModel)
            // }
            // await Batch.deleteOne({_id: new ObjectId(batchId)})
            res.status(200).json({success: true, message: "Batch successfully deleted"}) 
        }
    }
    catch(err){
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
const all = expressAsyncHandler(async (req, res) => {
    try {
        const allBatches = await Batch.find({}, {projections: {students: 0}});
        if (!allBatches) {
            res.status(200).json({ success: false, message: "No batches found" });
            res.end();
        }

        res.status(200).json({
            success: true,
            message: "Queries fetched successfully",
            batches: allBatches
        });

        res.end()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
const update = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const doesCourseExit = await Batch.findOne({ _id: new ObjectId(data._id) });
        if (doesCourseExit) {
            await MongoDB.updateOne(req, data, 'batch', Batch)
            return res.status(200).json({ success: true, message: "Batch edited successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Batch doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
const add1 = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const batchExists = await checkBatchExistence(data.batchName, data.courseName, data.regulation);
        if (!batchExists) {
           const result = await MongoDB.saveMany(req, data.students, 'student', Student)
           const studentsObjectId = [];
           result.map((student)=> studentsObjectId.push(student._id))
           delete data.students
           const newData = {...data, students: studentsObjectId}
            await MongoDB.save(req, newData, 'students', Batch)
            res.status(200).json({ success: true, message: "Batch added successfully" });
        } else {
            res.status(409).json({ success: false, message: "Batch exists with the same name, course, and program" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error! Team is working on it to fix" });
    }
});

async function checkBatchExistence(batchName, courseName, regulation) {
    const existingBatch = await Batch.findOne({ batchName, courseName, regulation });
    return !!existingBatch;
}

async function insertBatchData(batchName, semester, academicYear, courseName, program, students, studentsData, department) {
    await db.collection('batches').insertOne({ batchName: batchName, semester: semester, academicYear: academicYear, courseName: courseName, program: program, students: students, department });

    if (Array.isArray(studentsData)) {
        await db.collection('students').insertMany(studentsData);
    } else {
        console.error('studentsData is not an array of documents');
    }
}

export {
    details2,
    all,
    update,
    add1,
    deleteBatch
}