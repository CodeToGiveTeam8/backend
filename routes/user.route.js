const express = require("express");
const {validateUser,saveUserService,checkValidUser,getUserByEmail,sendMail} =  require("../services/user.service")
const {genWebToken} = require("../services/auth.service");
const { getUploadProfilePic,getProfilePic } = require("../minio_services/minio.service")
const { auth } = require("../middlewares");

const userRouter = express.Router();

userRouter.get("/user",auth,(req,res)=>{
    res.status(200).json({
        "data" : req.userData
    })
});

userRouter.post("/user/register",async(req,res)=>{
    var user = req.body

    try{
        if(validateUser(user)){
            user = await saveUserService(user)
            console.log("--------->",user)
            if(user.error){
                return res.status(400).json({
                    "msg" : user.msg
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
    }catch(err){
        console.log(err)
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
});

userRouter.post("/user/image",async(req,res)=>{
    var email = req.body.email
    try{
        if(email){
            link = await getUploadProfilePic(email)
            return res.status(400).json({
                "link" : link
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
})

userRouter.get("/user/image",auth,async(req,res)=>{
    var email = req.userData.email
    try{
        if(email){
            link = await getProfilePic(email)
            return res.status(400).json({
                "link" : link
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
})

userRouter.post("/user/login",async(req,res)=>{
    var user = req.body
    //Just to inform frontend that the user is logged In.Front end should do necessary validation so that this route is not accessed,
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
        console.log(accessToken)
        return res.json({
            "access-token" : accessToken
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Credentials"
        })
    }

    
});

userRouter.post("/user/mail",auth,async(req,res)=>{
    var data = req.body
    await sendMail(data,req.userData.id)
    res.json({
        "msg" : "Sent mail successfully!"
    })
    
});

module.exports = {userRouter};