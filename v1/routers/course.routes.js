import express from 'express'
import { add, all, details, edit, delete1, getQuery } from "../controllers/course.controller.js"

const courseRouter = express.Router();

courseRouter.route('/add').post(add)

courseRouter.route('/all').get(all)

courseRouter.route('/details').post(details)

courseRouter.route('/edit').post(edit)

courseRouter.route('/queries').get(getQuery)

courseRouter.route('/delete').post(delete1)

export { courseRouter }