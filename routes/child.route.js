const express = require("express");
const {validateChild,saveChildService,changeStatus} =  require("../services/child.service");
const {getOrphanageIdService} = require("../services/orphanage.service")
const { auth } = require("../middlewares");

const childRouter = express.Router();

childRouter.get("/child",auth,(req,res)=>{
    console.log("getting user details")
});

childRouter.post("/child/add",auth,async(req,res)=>{
    var child = req.body

    if(validateChild(child)){
        child.UserId = req.userData.id
        orphanageId = await getOrphanageIdService(child.orphanage)
        child.OrphanageId = orphanageId
        child = await saveChildService(child)
        if(child==null){
            return res.status(400).json({
                "msg" : "Error saving data"
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

childRouter.post("/child/status/edit",auth,async(req,res)=>{
    Status = req.body.status
    childId = req.body.childId
    if(!Status || !childId){
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
    if(Status!="NOT STARTED" && Status!="DONE" && Status!="WORKING" && Status!="STOPPED"){
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }

    if(childId.length==0){
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }
    changed = changeStatus(childId,Status)
    return res.status(200).json({
        "msg" : "Updated the status successfully"
    })
})

module.exports = {childRouter};