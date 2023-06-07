import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './router/users'

const port = 8000
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/assm')
    .then(() => console.log('DB connected'))

app.use('/users',userRouter)

app.listen(port, () => {
    console.log('Server running');
})