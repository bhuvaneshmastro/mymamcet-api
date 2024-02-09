import express from 'express';
import {add ,getsem} from "../controllers/semester.controller.js"
const semesterRouter = express.Router()

semesterRouter.route('/add').post(add)

semesterRouter.route('/getSemester',).get( getsem)

export { semesterRouter }