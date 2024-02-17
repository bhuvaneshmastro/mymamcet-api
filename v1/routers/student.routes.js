import express from 'express'
import { getAllStudents } from '../controllers/student.controller.js';
const studentRoute = express.Router();

studentRoute.route('/').get(getAllStudents);

export { studentRoute }