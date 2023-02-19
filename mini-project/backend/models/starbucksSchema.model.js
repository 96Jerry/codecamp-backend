import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const StarbucksSchema = new Schema({
  //   _id: Schema.Types.ObjectId,
  token: String,
  phone: String,
  isAuth: Boolean,
});

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema);
