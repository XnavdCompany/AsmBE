import User from "../model/users";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import { signinSchema, signupSchema } from "../schemas/auth";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // kiểm tra tồn tại email

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    user.password = undefined;
    // tạo token từ server
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(201).json({
      message: "Đăng ký thành công",
      accessToken: token,
      user,
    });
  } catch (error) {}
};

const userSignin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signin = async (req, res) => {
  try {
    const body = req.body;
    const { error } = userSignin.validate(body);
    // validate
    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(400).send({
        message: "Tên đăng nhập hoặc mật khẩu sai !",
      });
    }
    const isValidate = bcrypt.compareSync(body.password, user.password);
    if (!isValidate) {
      return res.status(400).send({
        message: "Tên đăng nhập hoặc mật khẩu sai !",
      });
    }
    const accessToken = jwt.sign({ _id: user._id }, "assm", {
      expiresIn: "5m",
    });
    res.send({
      message: "Đăng nhập thành công !",
      data: {
        user,
        accessToken,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};
