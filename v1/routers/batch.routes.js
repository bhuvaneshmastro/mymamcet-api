import express from 'express'
import {
    details2,
    all,
    update,
    add1,
    deleteBatch
} from "../controllers/batch.controller.js"
const batchRouter = express.Router();

batchRouter.route('/all').get(all)
batchRouter.route('/edit').put(update)
batchRouter.route('/add').post(add1)
batchRouter.route('/:id').delete(deleteBatch)
batchRouter.route('/:id').get(details2)

export { batchRouter }