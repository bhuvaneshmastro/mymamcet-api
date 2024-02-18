import express from 'express'
import { getStudentsAndSemester } from '../controllers/exam.controller.js';
const examRoutes = express.Router();

examRoutes.get('/students-and-semester', getStudentsAndSemester);

export { examRoutes }