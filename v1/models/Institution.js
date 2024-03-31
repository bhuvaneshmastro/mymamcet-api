import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    inst_type: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    establishedIn: {
        type: Number,
        require: true
    },
    vision: {
        type: String,
        require: true
    },
    mission: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instAdmin'
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const Institution = mongoose.model('institution', InstitutionSchema);

export default Institution