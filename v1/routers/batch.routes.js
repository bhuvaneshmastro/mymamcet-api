import express from 'express'
import {
    query,
    details2,
    all,
    update,
    add1
} from "../controllers/batch.controller.js"
const batchRouter = express.Router();

batchRouter.route('/query').get(query)
batchRouter.route('/details').get(details2)
batchRouter.route('/all').get(all)
batchRouter.route('/update').post(update)
batchRouter.route('/add').post(add1)

export { batchRouter }