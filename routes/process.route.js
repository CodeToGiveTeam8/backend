const express = require("express");
const {validateProcess,saveProcessService,getFinishedProg,getCurrentlyWorkingProg,getDataNotStartedProg} =  require("../services/process.service");
const {validateProcessDocuments,saveProcessDocumentService} =  require("../services/document.service");
const {saveCategoryProcessService,getCategoryProcess} = require("../services/category_process.service")
const {addSubProcessService,validateSubProcess} = require("../services/subprocess.service")

const {auth} = require("../middlewares/index");
const { GetChildById } = require("../models/repo");

const processRouter = express.Router();

processRouter.get("/process",auth,async(req,res)=>{
    const category = req.query.category;
    console.log(category)
    if(!category){
        return res.status(400).json({
            "msg":"Invalid req body"
        })
    }
    if(category!="ABANDONED" && category!="SURRENDERED" && category!="ORPHANED" && category!="CHILD ADMITTED IN CCI BY FAMILY"){
        return res.status(400).json({
            "msg":"Invalid req body"
        })
    }
    data = await getCategoryProcess(category)
    return res.status(200).json({
        "data" : data
    })
})

processRouter.post("/process/add",auth,async(req,res)=>{
    console.log(req.userData)
    if(req.userData.role != "OPERATION"){
        return res.status(400).json({
            "msg":"Only OPERATION user can add new Process!"
        })
    }

    var process = {}
    process.name = req.body.name
    process.description = req.body.description
    // var documents = req.body.document
    var subprocess = req.body.subprocess //array

    if(validateProcess(process) && validateSubProcess(subprocess)
        && (req.body.category && (req.body.category=="ABANDONED" || req.body.category=="SURRENDERED" || req.body.category=="ORPHANED" || req.body.category=="CHILD ADMITTED IN CCI BY FAMILY")) 
        && (req.body.order_no && Number.isInteger(req.body.order_no))){

        r_Process = await saveProcessService(process)

        for(let sp of subprocess)
        {
            sp.ProcessId = r_Process.dataValues.id
            r_subprocess = await addSubProcessService(sp)
            documents = sp.documents //array
            for(let document of documents)
            { 
                data = {
                    ProcessId : r_Process.dataValues.id,
                    SubProcessId : r_subprocess.dataValues.id,
                    name : document
                }
                r_document = await saveProcessDocumentService(data)
            }
        }

        data = {
            processId : r_Process.dataValues.id,
            category : req.body.category,
            order_no : req.body.order_no,
        }

        r_categoryProcess = await saveCategoryProcessService(data)
        return res.status(200).json({
            "msg" : "Added Successfully"
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }

})

processRouter.get("/process/progress",auth,async(req,res)=>{
    ChildId = req.query.childId
    childData = await GetChildById(ChildId)
    if(childData && childData.status=="NOT STARTED"){
        data = { finished : null, working : null }
        data.notStarted = await getCategoryProcess(childData.category)
        return res.status(200).json({
            "data": data
        })
    }

    let res_data = {finished : [], working : [], notStarted : []}
    res_data.finished = await getFinishedProg(ChildId)
    res_data.working = await getCurrentlyWorkingProg(ChildId)
    res_data.notStarted = await getDataNotStartedProg(ChildId)

    // console.log(res_data)

    return res.status(200).json({
        "data": res_data
    })

})

module.exports = {processRouter}