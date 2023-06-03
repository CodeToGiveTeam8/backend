const express = require("express");
const {userModel} = require("../models");

const userRouter = express.Router();

userRouter.get("/user",async(req,res)=>{
    
    //console.log(await userModel.getUser());
    console.log("in user router");
});

userRouter.get("/user/add",(req,res)=>{
    console.log("in user add router");
});

module.exports = {userRouter};