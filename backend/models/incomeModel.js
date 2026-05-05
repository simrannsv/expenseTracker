import { Schema, model } from "mongoose";
const incomeSchema = new Schema(
  {
    income: {
      type: Number,
      required: [true, "Income is Mandatory"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);
export const incomeModel = model("income", incomeSchema);