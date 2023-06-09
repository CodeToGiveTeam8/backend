const { SaveSubProcessService, GetProcessDocumentsCount, GetDocumentsBySubprocessId, GetDocumentsUploadedCount } = require("../models/repo")

const validateSubProcess = async(data) => {
    for(let sp of data){
        if(!sp.name){
            return false
        }
        if(sp.name.length==0){
            return false
        }
    }
    
    return true
}

const addSubProcessService = async(data) => {
    data = await SaveSubProcessService(data)
    return data
}

const checkIfDocsUploaded = async(childId,subProcessId) => {
    val1 = await GetProcessDocumentsCount(subProcessId)
    val2 = await GetDocumentsUploadedCount(subProcessId,childId)
    console.log(val1,val2)
    if(val2>=val1){
        return true
    }
    return false
}

module.exports = {addSubProcessService,validateSubProcess,checkIfDocsUploaded}