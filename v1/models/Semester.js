import mongoose from "mongoose";
import { indiaDate } from "../services/DateAndTime.js";


const semester = new mongoose.Schema({
   
        department: {
          type: String,
          required: true
        },
        courseName: {
          type: String,
          required: true,
        },
        batchName: {
          type: String,
          required: true,
        },
        academicYear: {
          type: String,
          required: true
        },
        semester: {
          type: String,
          required: true
        },
        subjects: {
          type: [],
          required: true,
        },

        regulation:{
            type :String ,
            required: true
         },
        program: {
          type: String,
          required: true
        },

        createdAt:{
            type :String,
            default : () =>
                indiaDate.timestamps
            
        },
        lastModified:{
            type :String,
            default : () =>
                indiaDate.timestamps

        }
      
});


   

export const semesterModel = new mongoose.model('semesters ',semester);
