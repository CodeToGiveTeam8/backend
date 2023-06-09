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
        link = await getUploadLink(req.body.childId,req.body.subProcessId,element.name)
        links.push(link)
    }

    return res.json({
        "links" : links
    })
})

documentsUploadedRouter.post("/document/add",auth,async(req,res)=>{
    documents = req.body.documents
    
    for(let element of documents)
    {
        element.ChildChildId = req.body.childId
        element.SubProcessId = req.body.subProcessId
        await AddDocumentUploaded(element)
    }

    return res.json({
        "msg" : "Successfully added all the documents"
    })
})

documentsUploadedRouter.get("/document",auth,async(req,res)=>{
    const childId = req.query.childId;
    const subProcessId = req.query.subProcessId;

    //get all documents name and id
    data = await GetDocumentsUploaded(childId,subProcessId)

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
        link = await getDocumentUrl(data.dataValues.ChildId,data.dataValues.SubProcessId,data.dataValues.document_name)
    }

    return res.json({
        "link" : link
    })
})

documentsUploadedRouter.delete("/document",auth,async(req,res)=>{
    const documentId = req.query.documentId

    data = GetDocumentUploadedById(documentId)
    await DeleteDocumentUploaded(documentId)
    link = await deleteDocument(data.dataValues.ChildId,data.dataValues.SubProcessId,data.dataValues.document_name)

    return res.json({
        "msg" : "Successfully deleted the document"
    })
})

module.exports = {documentsUploadedRouter}