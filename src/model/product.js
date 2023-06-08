import mongoose from 'mongoose'

const { Schema } = mongoose

const Product = new Schema({
    name: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        require:true
    },
    image: {
        type:String,
        require:true
    },
    desc: {
        type:String,
        require:true
    },
    brandId: {
        type: Schema.ObjectId,
        ref: "brand",
    },
})

export default mongoose.model("product", Product)