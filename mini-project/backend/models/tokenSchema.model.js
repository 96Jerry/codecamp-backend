import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  _id: Schema.Types.ObjectId,
  token: String,
  phone: String,
  isAuth: Boolean,
});

export const Token = mongoose.model("Token", TokenSchema);