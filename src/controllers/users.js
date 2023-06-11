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
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    // nó vừa mã hóa và vừa so sánh
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }

    user.password = undefined;
    // tạo token từ server
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    return res.status(201).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {}
};


export const getUser = async (req, res) => {
  try {
      const data = await User.find()
      return res.send({
          message: "Tìm người dùng thành công",
          data,
      })
  } catch (err) {
      return res.send({
          message: err
      })
  }
}

export const getUserById = async (req, res) => {
  const id = req.params.id
  const data = await User.findById(id)
  if (data) {
      res.send({
          message: "Tìm người dùng thành công",
          data,
      })
  } else {
      res.status(404).send("Không tìm thấy người dùng")
  }
  res.end()
}

export const removeUser = async (req, res) => {
  try {
      const data = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
          message: "Người dùng đã được xóa thành công",
          data,
      });
  } catch (error) {
      return res.status(500).json({
          message: error,
      });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }
    return res.status(200).json({
      message: "Người dùng đã được cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
