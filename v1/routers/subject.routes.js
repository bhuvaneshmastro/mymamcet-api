import express from 'express'
import {
    add,
    all,
    queries,
    delete1,
    edit,
    details
} from "../controllers/subject.controller.js"
const subjectRoutes = express.Router();

subjectRoutes.route('/add').post(add)
subjectRoutes.route('/queries').post(queries)
subjectRoutes.route('/all').get(all)
subjectRoutes.route('/details').post(details)
subjectRoutes.route('/edit').post(edit)
subjectRoutes.route('/delete').post(delete1)

export { subjectRoutes }