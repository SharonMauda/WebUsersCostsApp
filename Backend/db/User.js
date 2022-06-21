import mongoose from "mongoose";

// The user schema
const userSchema = new mongoose.Schema({
    _id: {type: String},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birthday: {type: Date, required: true},
    marital_status: {
        type: String,
        required: true,
        enum: ['single', 'married', 'divorced']
    }
})

export default mongoose.model("User", userSchema);