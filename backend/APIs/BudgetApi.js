import exp from "express"
import { BudgetModel } from "../Models/BudgetModel.js"
export const budApp=exp.Router()

let budgets=[]
budApp.post('/addlimit',async(req,res)=>{
    try{
    const newBudget=new BudgetModel({
        ...req.body
    })
    budgets.push(newBudget)
    await newBudget.save()
    res.json({message:"Limit added ",payload:newBudget})
}
catch(err)
{
   res.status(500).json({ message: err.message }) 
}

    
})


budApp.get('/checklimit',async(req,res)=>{
    res.json({message:"Limits",payload:budgets})
})

budApp.put('/editlimit/:id',async(req,res)=>
{
    const updateBudget=await BudgetModel.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {returnDocument:"after"}
    )
    if(!updateBudget)
    {
        res.json({message:"Couldnot edit limit"})
    }
    res.json({message:"Updated Limit",payload:updateBudget})
})



