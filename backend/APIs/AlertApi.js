import { verifyToken } from "../Middlewares/verifyToken.js"  // add .js
import exp from 'express'
import { expenseModel } from "../Models/expenseModel.js"
import { BudgetModel } from "../Models/BudgetModel.js"

export const totalApp = exp.Router()

totalApp.get('/budgetAlert', verifyToken, async (req, res) => {
  try {
    // get all expenses of logged in user
    const expenses = await expenseModel.find({ userId: req.user.id })

    // get all budgets of logged in user
    const budgets = await BudgetModel.find({ userId: req.user.id })

    let alerts = []

    // check each budget category
    for (let budget of budgets) {
      // sum all expenses in that category
      const totalSpent = expenses
        .filter(exp => exp.category === budget.category)
        .reduce((acc, exp) => acc + exp.amount, 0)

      // compare with limit
      if (totalSpent > budget.limit) {
        alerts.push({
          category: budget.category,
          limit: budget.limit,
          spent: totalSpent,
          exceeded: totalSpent - budget.limit
        })
      }
    }

    if (alerts.length === 0) {
      return res.json({ message: "All budgets are under control" })
    }

    res.json({ message: "Budget exceeded", alerts })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})