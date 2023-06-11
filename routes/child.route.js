const express = require("express");
const {validateChild,saveChildService,changeStatus,getChild} =  require("../services/child.service");
const {getOrphanageIdService} = require("../services/orphanage.service")
const { getUploadProfilePic,getProfilePic } = require("../minio_services/minio.service")
const { auth } = require("../middlewares");

const childRouter = express.Router();

childRouter.get("/child",auth,async(req,res)=>{
    console.log(req.query)
    childId = req.query.childId
    childData = await getChild(childId)
    return res.status(200).json({
        "data" : childData
    })
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
            "data": child
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
    changed = await changeStatus(childId,Status)
    if(changed){
        return res.status(200).json({
            "msg" : "Updated the status successfully"
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid status change"
        })
    }
    
})

childRouter.post("/child/image",auth,async(req,res)=>{
    var childId = req.body.childId
    try{
        if(childId){
            childId = childId.replace(/\//g, '_');
            link = await getUploadProfilePic(childId)
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

childRouter.get("/child/image",auth,async(req,res)=>{
    var childId = req.query.childId
    try{
        if(childId){
            childId = childId.replace(/\//g, '_');
            link = await getProfilePic(childId)
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

module.exports = {childRouter};