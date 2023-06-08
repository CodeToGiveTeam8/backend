const express = require("express");
const {auth} = require("../middlewares/index");
const { DoneSubTask,DeleteSubTask,AddProcessProg,ChangeStatus,ChangeProgStatus } = require("../models/repo");
const { isProcessDone } = require("../services/process.service")

const subtaskRouter = express.Router();

subtaskRouter.post("/subtask/done",auth,async(req,res)=>{
    subtask = req.body
    await DoneSubTask(subtask)

    //check condn
    data = {
        ChildChildId: subtask.ChildId,
        ProcessId: subtask.ProcessId,
        SubProcessId: subtask.SubProcessId
    }
    if(await isProcessDone(data)){
        //change to done
        data = await ChangeProgStatus(data.dataValues.ChildId,data.dataValues.ProcessId)
        //add new progress    
        data = await AddProcessProg(subtask.dataValues.ChildId)
        if(data==null){
            ChangeStatus(data.ChildId,"DONE")
        }
    }

    return res.json({
        "msg" : "Added Successfully"
    })
})

subtaskRouter.post("/subtask/notdone",auth,async(req,res)=>{
    subtask = req.body.subtask
    await DeleteSubTask(element)
    
    return res.json({
        "msg" : "Deleted Successfully"
    })
})

module.exports = {subtaskRouter}