const { SaveProcess,GetSubProcessCount,GetSubProcessProgCount,GetProcessDocumentsCount,
    GetDocumentsUploadedCount,GetFinishedProg,GetCurrentlyWorkingProg,GetDataNotStartedProg,
    GetSubProcessProgress,GetDocumentsNeeded, GetDocumentsUploaded, GetSubProcessByProcessID, GetSubProcessByID
 } = require("../models/repo")

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
    return await GetFinishedProg(childId)
}

const getCurrentlyWorkingProg = async(childId)=>{
    return await GetCurrentlyWorkingProg(childId)
}

const getDataNotStartedProg = async(chilId)=>{
    return await GetDataNotStartedProg(chilId)
}

const getChildProcessDetails = async(childId,processId)=>{
    //get data from subprocessProgress
    let sub_proc_prog = await GetSubProcessProgress(childId,processId)
    for(let i=0;i<sub_proc_prog.length;i++){
        let sub_proc_details = await GetSubProcessByID(sub_proc_prog[i].dataValues.SubProcessId)
        sub_proc_prog[i].dataValues.name = sub_proc_details.name
        sub_proc_prog[i].dataValues.documentsNeeded = await GetDocumentsNeeded(sub_proc_prog[i].dataValues.SubProcessId)
        sub_proc_prog[i].dataValues.documentsUploaded = await GetDocumentsUploaded(childId,sub_proc_prog[i].dataValues.SubProcessId)
    }
    return sub_proc_prog
    //get required docs from process_docs
    //get docs uploaded for each subprocess
}

module.exports = { validateProcess,saveProcessService,isProcessDone,getFinishedProg,getCurrentlyWorkingProg,getDataNotStartedProg,getChildProcessDetails}