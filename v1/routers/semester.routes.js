import express from 'express';
import { add, getsem, editSem } from "../controllers/semester.controller.js"
const semesterRouter = express.Router()

semesterRouter.route('/').post(add)

semesterRouter.route('/').get(getsem)

semesterRouter.route('/').put(editSem)

semesterRouter.route('/:id').get(getsem)

export { semesterRouter }