import { Schema, model } from "mongoose";
const savingsSchema = new Schema(
  {
    savings: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);
export const savingsModel = model("savings", savingsSchema);