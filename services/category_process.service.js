const {SaveCategoryProcess} = require("../models/repo")

const saveCategoryProcessService = async(data)=>{
    data = await SaveCategoryProcess(data)
    return data
}

module.exports = {saveCategoryProcessService}