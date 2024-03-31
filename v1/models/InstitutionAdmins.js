import mongoose from "mongoose";

const InstitutionAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const InstAdmin = mongoose.model('instAdmin', InstitutionAdminSchema)

export default InstAdmin