import mongoose from "mongoose";

//* Create Structure By Using Mongoose Schema
const mySchema = mongoose.Schema({
  username: {
    require: true,
    type: String,
    // unique: true,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

//* User Models
const User = mongoose.model("User", mySchema);

//* Export
export default User;
