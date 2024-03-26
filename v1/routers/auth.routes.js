import express from 'express';
import { login, logout, register, changePassword, forgetPassword, onAuthState, change_profile } from "../controllers/auth.controller.js"
const v1AuthRouter = express.Router();


v1AuthRouter.route('/login').post(login)
v1AuthRouter.route('/forgot-password').post(forgetPassword)
v1AuthRouter.route('/logOut').get(logout)
v1AuthRouter.route('/user-state').get(onAuthState)
v1AuthRouter.route('/register').post(register)
v1AuthRouter.route('/change-password').post(changePassword)
v1AuthRouter.route('/change-profile-photo').put(change_profile)

export { v1AuthRouter };