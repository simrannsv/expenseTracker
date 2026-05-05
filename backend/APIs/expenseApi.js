import exp from 'express'
import { expenseModel } from "../Models/expenseModel.js"
import { verifyToken } from '../Middlewares/verifyToken.js'

export const expenseApp = exp.Router()

expenseApp.post('/addExpense', verifyToken, async (req, res) => {
  try {
    const newExp = new expenseModel({
      ...req.body,
      userId: req.user.id  // from token
    })
    await newExp.save()
    res.json({ message: "Expense Added", payload: newExp })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

expenseApp.get('/readExpenses', verifyToken, async (req, res) => {
  try {
    const expenses = await expenseModel.find({ userId: req.user.id })
    res.json({ message: "All Expenses", payload: expenses })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

expenseApp.put('/updateExpense/:id', verifyToken, async (req, res) => {
  try {
    const updatedExpense = await expenseModel.findByIdAndUpdate(
    { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { returnDocument: 'after' }
    )
    if (!updatedExpense) {
      return res.json({ message: "Expense not found" })
    }
    return res.json({ message: "Expense updated", payload: updatedExpense })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

expenseApp.delete('/deleteExpense/:id', verifyToken, async (req, res) => {
  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(
       { _id: req.params.id, userId: req.user.id }
    )
    if (!deletedExpense) {
      return res.json({ message: "Expense not found" })
    }
    return res.json({ message: "Expense deleted", payload: deletedExpense })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
