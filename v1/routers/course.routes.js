import express from 'express'
import { add, all, details, edit, delete1 } from "../controllers/course.controller.js"

const courseRouter = express.Router();

courseRouter.route('/add').post(add)

courseRouter.route('/all').get(all)

courseRouter.route('/:id').get(details)

courseRouter.route('/edit').put(edit)

courseRouter.route('/:id').delete(delete1)

export { courseRouter }