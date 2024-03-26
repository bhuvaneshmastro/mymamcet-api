import mongoose from "mongoose";
import { indiaDate } from "../services/DateAndTime.js";


const semester = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batches',
    require: true
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
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'subjects'
    }],
    required: true,
  },
  assignedFaculties: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        require: true
      },
      facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
      }
    }
  ],
  regulation: {
    type: String,
    required: true
  },
  logs: {
    type: [],
    require: true,
  },
  createdAt: {
    type: String,
    default: () =>
      indiaDate.timestamps

  },
  lastModified: {
    type: String,
    default: () =>
      indiaDate.timestamps

  }

});




export const semesterModel = mongoose.model('semesters', semester);
