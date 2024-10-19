import express from 'express'
import productmodel from '../models/productmodel.js'
import categorymodel from '../models/categorymodel.js'
import {createProduct, getProduct, getSingleProdcut, deleteProduct, updateProduct, getProductByName, deleteAllProducts } from '../controllers/productcontroller.js'
import {createCategory, getCategory, getSingleCategory, deleteCategory, updateCategory} from '../controllers/categorycontroller.js'
 const router = express.Router()
//main message
router.get('/', (req, res) =>{
    res.json({message: "Welcome to the Marketplace"})
})

 //Category Routes
router.get('/category', getCategory);
router.get('/category/:id', getSingleCategory);
router.post('/category', createCategory);
router.delete('/category/:id', deleteCategory);
router.patch('/category/:id', updateCategory);

// Product Routes 
router.get('/product', getProduct);
router.get('/product/:id', getSingleProdcut);
router.get('/product/:name', getProductByName);
router.post('/product', createProduct);
router.delete('/product/:id', deleteProduct);
router.delete('/product', deleteAllProducts);
router.patch('/product/:id', updateProduct);

 export default router