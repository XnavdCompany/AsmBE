import express from 'express'
import { createBrand, getBrand } from '../controller/brand'

const brandRouter = express.Router()

brandRouter.get('/brand', getBrand)
brandRouter.post('/brand', createBrand)

export default brandRouter