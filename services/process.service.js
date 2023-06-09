const { SaveProcess,GetSubProcessCount,GetSubProcessProgCount,GetProcessDocumentsCount,GetDocumentsUploadedCount,GetFinishedProg,GetCurrentlyWorkingProg,GetDataNotStartedProg } = require("../models/repo")

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
    console.log(val1,val2)
    if(val1!=val2){
        return false
    }
    return true
}

const getFinishedProg = async(childId)=>{
    data = await GetFinishedProg(childId)
    return data
}

const getCurrentlyWorkingProg = async(childId)=>{
    data = await GetCurrentlyWorkingProg(childId)
    return data
}

const getDataNotStartedProg = async(chilId)=>{
    data = await GetDataNotStartedProg(chilId)
    return data
}

module.exports = { validateProcess,saveProcessService,isProcessDone,getFinishedProg,getCurrentlyWorkingProg,getDataNotStartedProg }