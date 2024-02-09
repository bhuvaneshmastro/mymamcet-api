import express from 'express';
import { login, logout, register, changePassword, forgetPassword, onAuthState, change_profile } from "../controllers/auth.controller.js"
const authRouter = express.Router();


authRouter.route('/login').post(login)
authRouter.route('/forgot-password').post(forgetPassword)
authRouter.route('/logOut').get(logout)
authRouter.route('/user-state').get(onAuthState)
authRouter.route('/register').post(register)
authRouter.route('/change-password').post(changePassword)
authRouter.route('/change-profile-photo').put(change_profile)

export { authRouter };