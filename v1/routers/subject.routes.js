import express from 'express'
import {
    add,
    all,
    delete1,
    edit,
    details
} from "../controllers/subject.controller.js"
const subjectRoutes = express.Router();

subjectRoutes.route('/add').post(add)
subjectRoutes.route('/all').get(all)
subjectRoutes.route('/:id').get(details)
subjectRoutes.route('/edit').put(edit)
subjectRoutes.route('/:id').delete(delete1)

export { subjectRoutes }