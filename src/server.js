import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './router/users.js'
import brandRouter from './router/brand.js'
import productRouter from './router/product.js'
import cors from 'cors'



const port = 8000
const app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/assm')
    .then(() => console.log('DB connected'))

app.use('/users',userRouter),
app.use('/api',brandRouter),
app.use('/api',productRouter)

app.listen(port, () => {
    console.log('Server running');
})