import express from 'express'
import { batchModel } from '../models/Batch.js';
import { db } from '../../config/db.js';
const queriesRoutes = express.Router();

queriesRoutes.get('/regulations', async(req, res)=> {
    try{
        const allCourse = await db.collection('courses').find({}).toArray();
        const regulations = [...new Set(allCourse.map((course)=>(course.regulation)))]
        res.status(200).json({success: true, message: "Regulations fetched successfully", data: regulations});
    }
    catch(err){
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

export {queriesRoutes}