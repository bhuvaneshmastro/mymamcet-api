import express from 'express'
import {
    details2,
    all,
    update,
    add1,
    deleteBatch
} from "../controllers/batch.controller.js"
const v1BatchRouter = express.Router();

v1BatchRouter.route('/all').get(all)
v1BatchRouter.route('/edit').put(update)
v1BatchRouter.route('/add').post(add1)
v1BatchRouter.route('/:id').delete(deleteBatch)
v1BatchRouter.route('/:id').get(details2)

export { v1BatchRouter }