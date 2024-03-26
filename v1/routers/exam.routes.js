import express from 'express'
import { addScore, getStudentsAndSemester, updateScore } from '../controllers/exam.controller.js';
const v1ExamRoutes = express.Router();

v1ExamRoutes.get('/students-and-semester', getStudentsAndSemester);
v1ExamRoutes.post('/add-score', addScore);
v1ExamRoutes.put('/update-score', updateScore);

export { v1ExamRoutes }