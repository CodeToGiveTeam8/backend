const { SaveProcess,GetSubProcessCount,GetSubProcessProgCount,GetProcessDocumentsCount,GetDocumentsUploadedCount } = require("../models/repo")

const validateProcess = (process)=>{

    if(!process.name || !process.description){
        return false
    }

    if(process.name.length==0 || process.description.length==0){
        return false
    }
    return true
}

const saveProcessService = async(process)=>{
    process = await SaveProcess(process)
    return process
}

const isProcessDone = async(data)=>{
    console.log(data)
    val1 = await GetSubProcessCount(data.ProcessId)
    val2 = await GetSubProcessProgCount(data.ProcessId,data.ChildChildId)
    if(val1!=val2){
        return false
    }
    val1 = await GetProcessDocumentsCount(data.ProcessId)
    val2 = await GetDocumentsUploadedCount(data.ProcessId,data.ChildChildId)
    if(val2<val1){
        return false
    }
    return true
}

module.exports = { validateProcess,saveProcessService,isProcessDone }