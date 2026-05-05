import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { UserModel } from "./models/UserModel.js";
import {hash} from "bcrypt";
import { incomeApp } from "./APIs/income.js";
import { savingsApp } from "./APIs/savings.js";
import { expenseApp } from "./APIs/expense.js";
config();

// create express app
const app=exp();
//enable cors
app.use(cors({
    origin:['http://locslhost:5173'],
    credentials:true
}))

app.use(cookieParser())

app.use(exp.json());

app.use("/user-api", userApp);
app.use("/income-api",incomeApp)
app.use("/expense-api",expenseApp)
app.use("/saving-api",savingsApp)

const connectDB=async ()=>{
    try {
        await connect(process.env.DB_URL);
        console.log("connected to DB server");
        const port =process.env.PORT || 5000;
        app.listen(port,() => console.log(`server listening to ${port}...`));
    } 
    catch(err) {
        console.log("error in DB connection",err);
    }
};
connectDB();

//to handle invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({ message: `path ${req.url} is invalid` });
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});