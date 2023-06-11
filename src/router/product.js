import express from 'express'
import { getProduct, getProductById, createProduct, removeProduct, updateProduct } from '../controllers/product.js'

const productRouter = express.Router()

productRouter.get('/product', getProduct)
productRouter.get('/product/:id', getProductById)
productRouter.post('/product', createProduct)
productRouter.delete('/product/:id', removeProduct)
productRouter.put('/product/:id', updateProduct)



export default productRouter