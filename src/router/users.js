import express from 'express'
import { signin, signup, getUser, removeUser, updateUser, getUserById } from '../controllers/users.js'

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.get('/user',getUser)
userRouter.get('/user/:id',getUserById)
userRouter.delete('/user/:id',removeUser)
userRouter.put('/user/:id',updateUser)




export default userRouter