import express from 'express'
import { addScore, getStudentsAndSemester, updateScore } from '../controllers/exam.controller.js';
const examRoutes = express.Router();

examRoutes.get('/students-and-semester', getStudentsAndSemester);
examRoutes.post('/add-score', addScore);
examRoutes.put('/update-score', updateScore);

export { examRoutes }