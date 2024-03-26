import express from 'express'
import {
    add,
    all,
    delete1,
    edit,
    details
} from "../controllers/subject.controller.js"
const v1SubjectRoutes = express.Router();

v1SubjectRoutes.route('/add').post(add)
v1SubjectRoutes.route('/all').get(all)
v1SubjectRoutes.route('/:id').get(details)
v1SubjectRoutes.route('/edit').put(edit)
v1SubjectRoutes.route('/:id').delete(delete1)

export { v1SubjectRoutes }