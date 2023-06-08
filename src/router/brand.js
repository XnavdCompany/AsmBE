import express from 'express'
import { createBrand, getBrand, getBrandById } from '../controllers/brand.js'

const brandRouter = express.Router()

brandRouter.get('/brand', getBrand)
brandRouter.get('/brand/:id', getBrandById)
brandRouter.post('/brand', createBrand)

export default brandRouter