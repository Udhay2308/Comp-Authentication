const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router() // This is used when we want to create api in file other than app.js
const crypto = require("crypto")

authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    
    const isUserAlreadyExists = await userModel.findOne({email})
    if(isUserAlreadyExists){
        res.status(409).json({
            message : "User already exists with this email..."
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        name,email,password:hash
    })
    const token = jwt.sign(
        {
            id : user._id,
            email : user.email,
        },process.env.JWT_SECRET,{expiresIn: "1h"})

    res.cookie("Jwt_token",token)
    res.status(201).json({
        message : "User registered successfully..",user,token
    })
})
authRouter.get("/getuser",async (req,res)=>{
    const token = req.cookies.Jwt_token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
   res.json({
    name : user.name,
    email : user.email,
   })
})

module.exports = authRouter