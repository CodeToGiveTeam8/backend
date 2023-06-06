const { SaveProcessDocument } = require("../models/repo")

const validateProcessDocument = async(data)=>{
    if(!data.name){
        return false
    }
    if(data.name.length==0){
        return false
    }
    return true
}

const saveProcessDocumentService = async(data)=>{
    data = await SaveProcessDocument(data)
    return data
}

module.exports = { validateProcessDocument,saveProcessDocumentService }