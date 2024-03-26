import express from 'express';
import { details, add } from "../controllers/user.controller.js"
const v1UserRouter = express.Router();

v1UserRouter.route('/details',).get(details)
v1UserRouter.route('/add',).post(add)

export { v1UserRouter }