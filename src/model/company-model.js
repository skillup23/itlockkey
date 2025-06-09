import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
  },
  {
    // Автоматическое присвоение времени создания и времени изменения
    timestamps: true,
  }
);

const Company =
  mongoose.models?.Company || mongoose.model('Company', companySchema);

export default Company;
