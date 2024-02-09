import express from 'express';
import {add ,getsem, editSem} from "../controllers/semester.controller.js"
const semesterRouter = express.Router()

semesterRouter.route('/add').post(add)

semesterRouter.route('/getSemester').get( getsem)

semesterRouter.route('/editSemester').put(editSem)

export { semesterRouter }