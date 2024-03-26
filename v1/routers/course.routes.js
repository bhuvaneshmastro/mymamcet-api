import express from 'express'
import { add, all, details, edit, delete1 } from "../controllers/course.controller.js"

const v1CourseRouter = express.Router();

v1CourseRouter.route('/add').post(add)

v1CourseRouter.route('/all').get(all)

v1CourseRouter.route('/:id').get(details)

v1CourseRouter.route('/edit').put(edit)

v1CourseRouter.route('/:id').delete(delete1)

export { v1CourseRouter }