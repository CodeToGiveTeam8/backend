const { SaveChild } = require("../models/repo")

const validateChild = (child)=>{

    if(!child.childId || !child.gender || !child.category || !child.enrollment_date){
        return false
    }

    if(child.childId.length==0 || child.gender.length==0 || child.category.length==0 || child.enrollment_date.length==0){
        return false
    }
    return true
}

const saveChildService = async(child)=>{
    child = await SaveChild(child)
    return child
}

module.exports = { validateChild,saveChildService }