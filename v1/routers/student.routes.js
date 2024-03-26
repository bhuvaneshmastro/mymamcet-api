import express from 'express'
import { getAllStudents } from '../controllers/student.controller.js';
const v1StudentRoute = express.Router();

v1StudentRoute.route('/').get(getAllStudents);

export { v1StudentRoute }