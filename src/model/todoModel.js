import mongoose from 'mongoose';

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
  },
  {
    // Автоматическое присвоение времени создания и времени изменения
    timestamps: true,
  }
);

const Todo = mongoose.models?.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
