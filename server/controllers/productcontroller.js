import mongoose from 'mongoose'
import productmodel from '../models/productmodel.js'
import product from '../models/productmodel.js'


export const getProduct = async (req, res) => {
    const products = await productmodel.find({}).sort({createAt: -1})
    res.status(200).json(products)
}

export const getSingleProdcut = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Product"})
    }
    const product = await productmodel.findById(id)

    if(!product){
        res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(product)
}

export const createProduct = async (req, res) => {
    const {name, description, price, quantity, category} = req.body

    try{
        const product = await productmodel.create({name, description, price, quantity, category})
        res.status(200).json(product)
    }catch(e){
        res.status(400).json({error: e.message})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Product"})
    }
    const product = await productmodel.findOneAndDelete({_id: id})

    if(!product){
        res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(product)
    
}

export const deleteAllProducts = async(req, res) => {
    try{
        const result = await productmodel.deleteMany()
        res.status(200).json({message: "All products deleted"})
    }catch(e){
        res.status(400).json({error: "Error cannot delete"})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Product"})
    }
    const product = await productmodel.findOneAndUpdate({_id: id}, {
       ...req.body
    })

    if(!product){
        res.status(404).json({error: 'No such Product'})
    }
    res.status(200).json(product)
}

export const getProductByName = async (req, res) => {
    const keyword = req.params.name

    const products = await productmodel.find()

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().startsWith(keyword.toLowerCase())

    )

    if (filteredProducts.length === 0){
        return res.status(400).json({error: "No such product"})
    }
    res.status(200).json(filteredProducts)
}