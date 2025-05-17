import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    todoDeadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    executor: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    // Автоматическое присвоение времени создания и времени изменения
    timestamps: true,
  }
);

const Todo = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
