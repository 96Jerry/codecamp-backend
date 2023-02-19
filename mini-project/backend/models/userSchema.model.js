import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  //   _id: Schema.Types.ObjectId,
  token: String,
  phone: String,
  isAuth: Boolean,
});

export const User = mongoose.model("User", UserSchema);
