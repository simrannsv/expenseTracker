import { model,Schema } from "mongoose";
const expenseMod=new Schema(
    {
        userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false
    },
        //expense(amount,category)
        amount:
        {
            type:Number,
            required:[true,"Kindly add amount,to add expense"]
        },
        item:
        {
            type:String,

        },
        category:{
            type:String,
            required:[true,"Kindly add a category"]
        }

    },
    {
        timestamps:true
    }
);

export const expenseModel=model("expense",expenseMod)
