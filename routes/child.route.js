const express = require("express");
const {validateChild,saveChildService} =  require("../services/child.service");
const { auth } = require("../middlewares");

const childRouter = express.Router();

childRouter.get("/child",auth,(req,res)=>{
    console.log("getting user details")
});

childRouter.post("/child/add",auth,async(req,res)=>{
    var child = req.body

    if(validateChild(child)){
        child.UserId = req.userData.id
        child = await saveChildService(child)
        if(child==null){
            return res.status(400).json({
                "msg" : "Child Already exist"
            })
        }
        return res.status(200).json({
            "msg":"Child added Successfully"
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
});

childRouter.put("/child/edit",auth,async(req,res)=>{
    console.log("Edit Child data's")
});

module.exports = {childRouter};