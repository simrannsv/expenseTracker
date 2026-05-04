import exp, { response } from'express'
import { expenseModel } from "../Models/expenseModel.js";
 export const expenseApp=exp.Router()

 let expenses=[]
 //this is to add expense
 expenseApp.post('/addExpense', async (req, res) => {
  const newExp = new expenseModel(req.body)
  expenses.push(newExp)
  await newExp.save()
  res.json({ message: "Expense Added", payload: newExp })
})

//this to see the history of expenses
expenseApp.get('/readexpenses', (req, res) => {
    res.json({ message: "All products", payload: expenses }) 
})

//this to update expenses
expenseApp.put('/updateExpenses/:id', async (req, res) => {
  const updatedExpense = await expenseModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )
  if (!updatedExpense) {
    return res.json({ message: "Expense not found" })
  }
  return res.json({ message: "Expense updated", payload: updatedExpense })
})

expenseApp.delete('/deleteExpenses/:id',async(req,res)=>
{
    const deletedExpense=await expenseModel.findByIdAndDelete(req.params.id)
    if(!deletedExpense)
    {
        return res.json({message:"Expense not found"})

    }
    return res.json({ message: "Expense deleted", payload: deletedExpense })
})