
import { expenseModel } from "../models/expenseModel.js";
import { incomeModel } from "../models/incomeModel.js";
// import { income } from "../APIs/income.js";
import exp from "express";

export const expenseApp = exp.Router();
expenseApp.post("/expense", async (req, res) => {
  const expense = req.body;
});