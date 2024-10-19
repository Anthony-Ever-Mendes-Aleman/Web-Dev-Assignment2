import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    }
}, {timestamps: true})

const product = mongoose.model("Product", productSchema)

export default product