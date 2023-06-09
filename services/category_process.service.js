const {SaveCategoryProcess,GetCategoryProcess,GetProcessByID,GetSubProcessByID,GetDocumentsBySubprocessId} = require("../models/repo")

const saveCategoryProcessService = async(data)=>{
    data = await SaveCategoryProcess(data)
    return data
}

const getCategoryProcess = async(category)=>{
    r_data = []
    categoryProcessData = await GetCategoryProcess(category)
    for (let element of categoryProcessData) {
        processData = await GetProcessByID(element.dataValues.ProcessId)
        console.log(processData)
        SubProcessData = await GetSubProcessByID(element.dataValues.ProcessId)
        for(let subprocess of SubProcessData){
            subprocess.dataValues.documents = await GetDocumentsBySubprocessId(subprocess.dataValues.id)
        }
        element.dataValues.process = processData[0]
        element.dataValues.process.dataValues.subProcess = SubProcessData
        r_data.push(element)
    }
    return r_data
}

module.exports = {saveCategoryProcessService,getCategoryProcess}