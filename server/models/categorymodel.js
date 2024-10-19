import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true

    }
}, {timestamps: true})

const category = mongoose.model("Category", categorySchema)

export default category