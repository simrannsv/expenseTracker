import exp from 'express'
import {config} from 'dotenv'
import {connect} from 'mongoose'
import { expenseApp } from './Apis/expenseApi.js'
config()
const app=exp()
app.use(exp.json())


 const port=process.env.PORT || 4545


 app.use('/expense-api',expenseApp)

//custom midleware
function middleware1(req,res,next)
{
    res.json({message:"this res from middleware1"})
    //console.log('middleware1 executed')
   
}
function middleware2(req,res,next)
{
     //res.json({message:"this res from middleware2"})
     console.log('middleware2 executed')
     next()
}

async function connectDB() {
    try{
        await connect(process.env.DB_URL);
        console.log("DB connection sucessful")
        app.listen(port,()=>console.log(`server listening to ${port}...`))
    }
    catch(err)
    {
        console.log("err in Db connection:",err)
    }
}
connectDB()