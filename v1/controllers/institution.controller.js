import { ObjectId } from "mongodb";
import Institution from "../models/Institution.js";
import InstAdmin from "../models/InstitutionAdmins.js";
import bcrypt from 'bcryptjs'
import { getID } from "../services/getID.js";

const createInstitution = async (req, res, next) => {
    const newInstitution = req.body;
    const existingInstitution = await Institution.findOne({ name: newInstitution.name })

    if (existingInstitution) {
        return res.status(409).json({ success: false, message: "Institution found with same name. Please use another name" })
    }
    const adminInfo = { name: newInstitution.adminName, email: newInstitution.adminEmail, password: newInstitution.adminPassword }

    delete newInstitution.adminName
    delete newInstitution.adminEmail
    delete newInstitution.adminPassword

    const hashedPassword = bcrypt.hashSync(adminInfo.password, 10);

    const admin = new InstAdmin({
        name: adminInfo.name,
        password: hashedPassword,
        email: adminInfo.email
    })
    console.log(admin.password);
    const adminDBResult = await admin.save();

    const institution = new Institution({
        name: newInstitution.name,
        inst_type: newInstitution.inst_type,
        category: newInstitution.category,
        establishedIn: newInstitution.establishedIn,
        vision: newInstitution.vision,
        mission: newInstitution.mission,
        address: newInstitution.address,
        admin: adminDBResult._id
    });
    await institution.save();

    res.status(201).json({ success: true, message: "Institution created successfully" })
}

const deleteInstitution = async(req, res, next) => {
    const InstitutionData = req.body;
    await Institution.findOneAndDelete({_id: new ObjectId(InstitutionData._id)})
    return res.status(200).json({success: true, message: "Institution deleted successfull"})
}

const viewInstitutionDetails = async (req, res, next) => {
    const InstitutionData = getID(req.path);
    const inst = await Institution.findOne({_id: new ObjectId(InstitutionData)});

    if(!inst){
        return res.status(200).json({success: false, message: "Requested Intitution not found!"})
    }
    res.status(200).json({success: true, message: "Institution detail fetched successfully", inst})
}

const updateInstitutionDetail = async (req, res, next) => {
    const InstitutionData = req.body;
    const existingInstitution = await Institution.findOne({ _id: new ObjectId(InstitutionData._id) })

    if (!existingInstitution) {
        return res.status(409).json({ success: false, message: "Institution not found" })
    }

    delete InstitutionData._id
    const inst = await Institution.updateOne({_id: existingInstitution._id}, {$set: InstitutionData})
    return res.status(200).json({success: true, message: "Institution detail has been updated"})
}

const pauseInstitutionServices = async (req, res, next) => {
    const InstitutionData = req.body;
    const inst = await Institution.findOneAndUpdate({_id: InstitutionData._id}, {$set: {isActive: false}})
    return res.status(200).json({success: true, message: "Institution service has been blocked"})
}

const resumeInstitutionServices = async (req, res, next) => {
    const InstitutionData = req.body;
    const inst = await Institution.findOneAndUpdate({_id: InstitutionData._id}, {$set: {isActive: true}})
    return res.status(200).json({success: true, message: "Institution service has been resumed"})
}

export {
    createInstitution,
    deleteInstitution,
    viewInstitutionDetails,
    resumeInstitutionServices,
    pauseInstitutionServices,
    updateInstitutionDetail
}