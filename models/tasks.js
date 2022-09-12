import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);
export { Task };
