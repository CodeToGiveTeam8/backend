const express = require("express");
const {auth} = require("../middlewares/index");
const { AddDocumentUploaded,GetDocumentsUploaded,GetDocumentUploadedById,DeleteDocumentUploaded,AddProcessProg,ChangeStatus,ChangeProgStatus } = require("../models/repo");
const { getDocumentUrl,deleteDocument,getUploadLink } = require("../minio_services/minio.service")
const { isProcessDone } = require("../services/process.service")


const documentsUploadedRouter = express.Router();

documentsUploadedRouter.post("/document/upload/link",auth,async(req,res)=>{
    documents = req.body.documents
    links = []

    for(let element of documents)
    {
        link = await getUploadLink(req.body.childId,req.body.processId,element.name)
        links.push(link)
    }

    return res.json({
        "links" : links
    })
})

documentsUploadedRouter.post("/document/add",auth,async(req,res)=>{
    documents = req.body.documents
    data = {}

    for(let element of documents)
    {
        element.ChildChildId = req.body.childId
        element.ProcessId = req.body.processId
        data.ChildChildId = req.body.childId
        data.ProcessId = req.body.processId
        await AddDocumentUploaded(element)
    }

    //check condn
    console.log("DATA --> ",data)
    if(await isProcessDone(data)){
        console.log(data)
        data = await ChangeProgStatus(req.body.childId,req.body.processId)
        data = await AddProcessProg(req.body.childId)
        if(data==null){
            ChangeStatus(req.body.childId,"DONE")
        }
    }

    return res.json({
        "msg" : "Successfully added all the documents"
    })
})

documentsUploadedRouter.get("/document",auth,async(req,res)=>{
    const childId = req.query.childId;
    const processId = req.query.processId;

    //get all documents name and id
    data = await GetDocumentsUploaded(childId,processId)

    return res.json({
        "data" : data
    })
})

documentsUploadedRouter.get("/document/link",auth,async(req,res)=>{
    const documentId = req.query.documentId
    link = ""

    data = await GetDocumentUploadedById(documentId)
    // console.log(data)

    if(data!=null){
        link = await getDocumentUrl(data.dataValues.ChildId,data.dataValues.ProcessId,data.dataValues.document_name)
    }

    return res.json({
        "link" : link
    })
})

documentsUploadedRouter.delete("/document",auth,async(req,res)=>{
    const documentId = req.query.documentId

    data = GetDocumentUploadedById(documentId)
    await DeleteDocumentUploaded(documentId)
    link = await deleteDocument(data.dataValues.ChildId,data.dataValues.ProcessId,data.dataValues.document_name)

    return res.json({
        "msg" : "Successfully deleted the document"
    })
})

module.exports = {documentsUploadedRouter}