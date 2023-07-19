import mongoose from "mongoose";

//* Create Structure By Using Mongoose Schema
const mySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

//* Task Models
const Task = mongoose.model("Task", mySchema);

//* Export
export default Task;
