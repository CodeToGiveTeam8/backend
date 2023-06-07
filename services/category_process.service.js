const {SaveCategoryProcess,GetCategoryProcess,GetProcessByID,GetSubProcessByID} = require("../models/repo")

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
        element.dataValues.process = processData
        element.dataValues.subProcess = SubProcessData
        r_data.push(element)
        console.log(r_data)
    }
    return r_data
}

module.exports = {saveCategoryProcessService,getCategoryProcess}