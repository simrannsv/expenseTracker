import {model,Schema} from 'mongoose'
const BudgetMod=new Schema(
    {
        category:
        {
            type:String,
            required:[true,"Category is mandatory"]
        },
        limit:
        {
            type:Number,
            required:[true,"Kindly set a limit for this category"]
        }
    },
    {
        timestamps:true
    }
)

export const BudgetModel=model("budget",BudgetMod)