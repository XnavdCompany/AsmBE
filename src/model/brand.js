import mongoose from 'mongoose'

const { Schema } = mongoose
const Brand = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model("brand", Brand)