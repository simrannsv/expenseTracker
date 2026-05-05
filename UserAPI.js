import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { config } from "dotenv";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;
export const userApp=exp.Router();
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
config();

//Route for register
userApp.post("/users", upload.single("profileImageUrl"), async (req, res) => {
  let cloudinaryResult;
  try {
    const newUser = req.body;
    console.log(newUser);
    console.log(req.file);


    //Upload image to cloudinary from memory the Storage
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // console.log("cloudinaryResult", cloudinaryResult); // to know in print statement
    //add CDN link(secure_url) of image to newUserObj
    newUser.profileImageUrl = cloudinaryResult?.secure_url;

    //run validators manually
    //hash password and replace plain with hashed one
    newUser.password = await hash(newUser.password, 12);

    //create New user document
    const newUserDoc = new UserModel(newUser);

    //save document
    await newUserDoc.save();
    //send res
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log("err is ", err);
    //delete image from cloudinary data
    if (cloudinaryResult.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

//Route for Login
userApp.post("/login", async (req, res) => {
  //console.log(req.body)
  //get user cred obj
  const { email, password } = req.body;
  //find user by email
  const user = await UserModel.findOne({ email: email });
  //if use not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare password
  const isMatched = await compare(password, user.password);
  //if passwords not matched
  if (!isMatched) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //creating the jwt
  const signedToken = sign(
    {
      id: user._id,
      email: email,
      Mob_num:user._Mob_num,
      Name: user.Name,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  //set token to res header as httpOnly cookie
  res.cookie("token", signedToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //removing the password from user a  document
  let userObj = user.toObject();
  delete userObj.password;

  //send res
  res.status(200).json({ message: "login success", payload: userObj, token: signedToken });
});

//Route Logout
userApp.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //send res
  res.status(200).json({ message: "Logout success" });
});
