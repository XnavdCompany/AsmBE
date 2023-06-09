import express from 'express'
import { createBrand, getBrand, getBrandById, updateBrand, removeBrand } from '../controllers/brand.js'

const brandRouter = express.Router()

brandRouter.get('/brand', getBrand)
brandRouter.get('/brand/:id', getBrandById)
brandRouter.post('/brand', createBrand)
brandRouter.patch('/brand/:id', updateBrand)
brandRouter.delete('/brand/:id', removeBrand)

export default brandRouter