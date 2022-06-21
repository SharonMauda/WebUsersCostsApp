import mongoose from "mongoose";

// The cost schema.
const costSchema = new mongoose.Schema({
    description: {type: String, required: true},
    sum: {type: Number, required: true},
    category: {type: String, required: true},
    created_by: {
        type: String,
        required: true,
        ref: 'User'
    }
}, {
    // Create timestamp fields.
    timestamps: {
        createdAt: "created_at" 
    }
})

export default mongoose.model("Cost", costSchema);