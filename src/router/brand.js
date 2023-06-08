import express from 'express'
import { createBrand, getBrand, getBrandById } from '../controller/brand'

const brandRouter = express.Router()

brandRouter.get('/brand', getBrand)
brandRouter.get('/brand/:id', getBrandById)
brandRouter.post('/brand', createBrand)

export default brandRouter