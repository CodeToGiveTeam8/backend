const express = require("express");
const {validateUser,saveUserService,checkValidUser,getUserByEmail} =  require("../services/user.service")
const {genWebToken} = require("../services/auth.service")

const userRouter = express.Router();

userRouter.put("/user",(req,res)=>{
    console.log("getting user details")
});

userRouter.post("/user/register",async(req,res)=>{
    var user = req.body

    if(validateUser(user)){
        user = await saveUserService(user)
        if(user==null){
            return res.status(400).json({
                "msg" : "Email Already exist"
            })
        }
        accessToken = genWebToken(user)
        return res.status(200).json({
            "msg":"User added Successfully"
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
});

userRouter.post("/user/login",async(req,res)=>{
    var user = req.body
    //Just to inform frontend that the user is logged In.Front end should do necessary validation so that this route is not accessed,
    console.log(req.userData)
    if(req.userData){
        console.log("This user is logged in...No need to do anything")
        return res.status(200).json({
            "msg":"user Logged In"
        })
    }

    if(!user.email || !user.password){
        return res.status(400).json({
            "msg" : "Invalid Credentials"
        })
    }

    if(await checkValidUser(user)){
        user = await getUserByEmail(user.email)
        accessToken = genWebToken(user)
        return res.json({
            "access-token" : accessToken
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Credentials"
        })
    }

    
});

module.exports = {userRouter};