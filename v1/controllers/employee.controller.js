import expressAsyncHandler from "express-async-handler";
import { Employee } from "../models/Employee.js";
import bcrypt from 'bcryptjs';
import { getID } from "../services/getID.js";
import { ObjectId } from "mongodb";

const addEmployee = expressAsyncHandler(async function (req, res) {
    const newUserData = req.body;
    const doesUserExit = await Employee.findOne({ email: newUserData.email });
    if (doesUserExit) {
        return res.status(409).json({ success: false, message: "User with this email is already exist" });
    }

    const hashedPassword = bcrypt.hashSync(newUserData.password, 10);
    const user = new Employee({
        ...newUserData,
        password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ success: true, message: "User has been added to database" });
});

const getEmployee = async(req, res, next) => {
    const empId = getID(req.path);
    const existEmployee = await Employee.findOne({_id: new ObjectId(empId)});
    if(!existEmployee){
        return res.status(200).json({success: false, message: "Employee not found with our record"})
    }
    res.status(200).json({success: true, message: "Employee details are fetched!", employee: existEmployee})
}

export {
    addEmployee,
    getEmployee
}
