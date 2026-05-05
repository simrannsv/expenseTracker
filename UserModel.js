import { Schema, model } from "mongoose";
const UserSchema= new Schema(
    {
        Name:{
            type:String,
            required:[true, "Name is mandatory"]
        },
        Mob_num:{
            type:Number,
            required:[true,"Mobile number is required"]
        },
        email:{
            type:String,
            required:[true ,"Email is required"],
            unique: [true,"Email is already existed"]
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        profileImageUrl:{
            type:String,
        },
        isUserActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true,
        versionkey:false,
        strict:"throw"
    }
);
export const UserModel=model ("user",UserSchema);