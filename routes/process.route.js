const express = require("express");
const {validateProcess,saveProcessService} =  require("../services/process.service");
const {validateProcessDocument,saveProcessDocumentService} =  require("../services/document.service");
const {saveCategoryProcessService} = require("../services/category_process.service")

const {auth} = require("../middlewares/index");
const { categoryProcess } = require("../models");

const processRouter = express.Router();

processRouter.get("/",auth,async(req,res)=>{
    //get list of all processes
})

processRouter.post("/process/add",auth,async(req,res)=>{
    //check if team admin
    if(req.userData.role != "TEAM LEAD"){
        return res.status(400).json({
            "msg":"Only Team-Lead can add new Process!"
        })
    }

    var process = req.body.process
    var documents = req.body.document

    if(validateProcess(process) && validateProcessDocument(documents) 
        && (req.body.category && (req.body.category=="ABONDED" || req.body.category=="SURRENDERED")) 
        && (req.body.order_no && Number.isInteger(req.body.order_no))){
        r_Process = await saveProcessService(process)
        for(let document of documents)
        { 
            r_document = await saveProcessDocumentService(document)
        }
        data = {
            processId : r_Process.id,
            category : req.body.category,
            order_no : req.body.order_no,
        }
        r_categoryProcess = await saveCategoryProcessService(data)
        return res.status(400).json({
            "msg" : "Added Successfully"
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }



})

module.exports = {processRouter}