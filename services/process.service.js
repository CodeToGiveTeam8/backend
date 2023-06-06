const { SaveProcess } = require("../models/repo")

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

module.exports = { validateProcess,saveProcessService }