import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    default: 1,
  },
});


export default mongoose.model("user", User);
