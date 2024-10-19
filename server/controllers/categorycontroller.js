import mongoose from 'mongoose'
import categorymodel from '../models/categorymodel.js'


export const getCategory = async (req, res) => {
    const categories = await categorymodel.find({}).sort({createAt: -1})
    res.status(200).json(categories)
}

export const getSingleCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Category"})
    }
    const category = await categorymodel.findById(id)

    if(!category){
        res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(category)
}

export const createCategory = async (req, res) => {
    const {name} = req.body

    try{
        const category = await categorymodel.create({name})
        res.status(200).json(category)
    }catch(e){
        res.status(400).json({error: e.message})
    }
}

export const deleteCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Product"})
    }
    const category = await categorymodel.findOneAndDelete({_id: id})

    if(!category){
        res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(category)
    
}

export const updateCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Product"})
    }
    const category = await categorymodel.findOneAndUpdate({_id: id}, {
       ...req.body
    })

    if(!category){
        res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(category)
}