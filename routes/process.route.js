const express = require("express");
const {validateProcess,saveProcessService} =  require("../services/process.service");
const {validateProcessDocuments,saveProcessDocumentService} =  require("../services/document.service");
const {saveCategoryProcessService,getCategoryProcess} = require("../services/category_process.service")
const {addSubProcessService,validateSubProcess} = require("../services/subprocess.service")

const {auth} = require("../middlewares/index");

const processRouter = express.Router();

processRouter.get("/process",auth,async(req,res)=>{
    console.log(req.query)
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
            "msg":"Only OPERATION can add new Process!"
        })
    }

    var process = req.body.process
    var documents = req.body.document
    var subprocess = req.body.subprocess

    if(validateProcess(process) && validateProcessDocuments(documents) && validateSubProcess(subprocess)
        && (req.body.category && (req.body.category=="ABANDONED" || req.body.category=="SURRENDERED" || req.body.category=="ORPHANED" || req.body.category=="CHILD ADMITTED IN CCI BY FAMILY")) 
        && (req.body.order_no && Number.isInteger(req.body.order_no))){

        r_Process = await saveProcessService(process)
        for(let document of documents)
        { 
            document.ProcessId = r_Process.dataValues.id
            r_document = await saveProcessDocumentService(document)
        }

        for(let sp of subprocess)
        {
            sp.ProcessId = r_Process.dataValues.id
            r_subprocess = await addSubProcessService(sp)
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

module.exports = {processRouter}