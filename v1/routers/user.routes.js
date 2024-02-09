import express from 'express';
import { details, add } from "../controllers/user.controller.js"
const userRouter = express.Router();

userRouter.route('/details',).get(details)
userRouter.route('/add',).post(add)

export { userRouter }