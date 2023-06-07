const { SaveProcessDocument } = require("../models/repo")

const validateProcessDocuments = async(data)=>{
    for(let pdoc of data){
        if(!pdoc.name){
            return false
        }
        if(pdoc.name.length==0){
            return false
        }
    }
    return true
}

const saveProcessDocumentService = async(data)=>{
    data = await SaveProcessDocument(data)
    return data
}

module.exports = { validateProcessDocuments,saveProcessDocumentService }