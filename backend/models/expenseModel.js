import { Schema, model } from "mongoose";
const expenseSchema = new Schema(
  {
    expense: {
      type: Number,
    },
    exepenseCategory: {
      type: String,
      required: [true, "category type is required fro better expense tracking"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);
export const expenseModel = model("expense", expenseSchema);