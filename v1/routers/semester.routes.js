import express from 'express';
import { add, getsem, editSem } from "../controllers/semester.controller.js"
const v1SemesterRouter = express.Router()

v1SemesterRouter.route('/').post(add)

v1SemesterRouter.route('/').get(getsem)

v1SemesterRouter.route('/').put(editSem)

v1SemesterRouter.route('/:id').get(getsem)

export { v1SemesterRouter }