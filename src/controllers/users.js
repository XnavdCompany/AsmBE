import User from "../model/users";
import bcrypt from 'bcrypt'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

const salt = bcrypt.genSaltSync(10);

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
        "string.min": "Mật khẩu không hợp lệ",
        "string.empty": "Trường dữ liệu bắt buộc"
    }),
    confirmPassword: Joi.ref('password'),
    role : Joi.number().default(1)
})

export const signup = async (req, res) => {
    try {
        const body = req.body
        const { error } = userSchema.validate(body)
        if (error) {
            res.status(400).send({
                message: error.details[0].message
            })
        } else {
            const hash = bcrypt.hashSync(body.password, salt);
            const data = await User.create({ ...body, password: hash })
            res.send({
                message: "Sigup Susccessfully !",
                data: data
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

const userSignin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const signin = async(req, res) => {
    try {
        const body = req.body
        const { error } = userSignin.validate(body)
        // validate
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }
        const user = await User.findOne({ email: body.email })
        if (!user) {
            return res.status(400).send({
                message: "Tên đăng nhập hoặc mật khẩu sai !"
            })
        }
        const isValidate = bcrypt.compareSync(body.password, user.password)
        if (!isValidate) {
            return res.status(400).send({
                message: "Tên đăng nhập hoặc mật khẩu sai !"
            })
        }
        const accessToken = jwt.sign({ _id: user._id }, "assm", { expiresIn: "5m" })
        res.send({
            message: "Đăng nhập thành công !",
            data: {
                user, accessToken
            }
        })
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}