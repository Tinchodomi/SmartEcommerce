import { Schema, model } from "mongoose";
import cartModel from "./carts.model.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "user",
  },

  age: {
    type: Number,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.cart) {
    try {
      const newCart = await cartModel.create({});
      this.cart = newCart._id;
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const userModel = model("users", userSchema);
export default userModel;
