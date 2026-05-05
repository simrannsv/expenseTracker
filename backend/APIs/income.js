import { incomeModel } from "../models/incomeModel.js";
import exp from "express";
import { verifytoken } from "../middlewares/verifyToken.js";

export const incomeApp = exp.Router();

incomeApp.post("/income", verifytoken(), async (req, res) => {
  const income = req.body;
  const newIncomeDoc = new incomeModel(income);
  await newIncomeDoc.save();
  console.log("Income: ", income);
  res.json({ message: "income added", payload: income });
});
