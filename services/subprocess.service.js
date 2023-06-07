const { SaveSubProcessService } = require("../models/repo")

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

module.exports = {addSubProcessService,validateSubProcess}