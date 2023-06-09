import joi from "joi";

export const signupSchema = joi.object({
  username: joi.string().required().min(6).message({
    "string.username": "Username không đủ chiều dài yêu cầu",
    "string.empty": "Username không được để trống",
    "any.required": "Trường username là bắt buộc",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Email không đúng định dạng",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
  }),
  password: joi.string().required().min(6).messages({
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "string.empty": "Password không được để trống",
    "any.required": "Trường Password là bắt buộc",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Password không khớp",
    "any.required": "Trường confirm password là bắt buộc",
  }),
});
export const signinSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email không đúng định dạng",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
  }),
  password: joi.string().required().min(6).messages({
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "string.empty": "Password không được để trống",
    "any.required": "Trường Password là bắt buộc",
  }),
});
