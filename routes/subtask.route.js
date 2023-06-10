const express = require("express");
const {auth} = require("../middlewares/index");
const { DoneSubTask,NotDoneSubTask,AddProcessProg,ChangeStatus,ChangeProgStatus } = require("../models/repo");
const { isProcessDone } = require("../services/process.service")
const { checkIfDocsUploaded } = require("../services/subprocess.service")

const subtaskRouter = express.Router();

subtaskRouter.post("/subtask/done",auth,async(req,res)=>{
    subtask = req.body

    //check condn
    if(await checkIfDocsUploaded(subtask.ChildId,subtask.SubProcessId)){
        await DoneSubTask(subtask)
    }else{
        return res.status(400).json({
            "msg" : "Upload the documents needed to finish the task!"
        })
    }

    //check condn
    data = {
        ChildChildId: subtask.ChildId,
        ProcessId : subtask.ProcessId,
        SubProcessId: subtask.SubProcessId
    }
    if(await isProcessDone(data)){
        //change to done
        await ChangeProgStatus(data[0].dataValues.ChildId,data[0].dataValues.ProcessId,"DONE")
        //add new progress    
        childId = data[0].dataValues.ChildId
        data = await AddProcessProg(data[0].dataValues.ChildId)
        if(data==null){
            console.log("DONE FOR CHILD : ",childId)
            ChangeStatus(childId,"DONE")
        }
    }

    return res.json({
        "msg" : "Added Successfully"
    })
})

subtaskRouter.post("/subtask/notdone",auth,async(req,res)=>{
    subtask = req.body
    await NotDoneSubTask(subtask)
    //change process to notDone
    await ChangeProgStatus(subtask.ChildId,subtask.ProcessId,"NOT DONE")
    //change childStatus to working
    ChangeStatus(subtask.ChildId,"WORKING")
    
    return res.json({
        "msg" : "Changed Successfully"
    })
})

module.exports = {subtaskRouter}