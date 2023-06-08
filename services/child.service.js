const { SaveChild,GetOrphanageId,ChangeStatus,ProcessProgressCheck,GetPrevStatus,GetNoOfProcessFromProcProg,GetChildById,GetNoOfProcessFromCat,AddProcessProg } = require("../models/repo")

const validateChild = (child)=>{

    if(!child.childId || !child.gender || !child.category || !child.enrollment_date || !child.orphanage){
        return false
    }

    if(child.childId.length==0 || child.gender.length==0 || child.category.length==0 || child.enrollment_date.length==0){
        return false
    }

    val = GetOrphanageId(child.orphanage)
    if(val==-1){
        return false
    }

    return true
}

const saveChildService = async(child)=>{
    child = await SaveChild(child)
    return child
}

const changeStatus = async(childId,Status)=>{
    canChange = false
    if(Status=="NOT STARTED"){
        data = await ProcessProgressCheck(childId)
        console.log(data)
        if(data==null){
            canChange = true
        }
    }else if(Status=="WORKING"){
        data = await GetPrevStatus(childId)
        if(data!="DONE"){
            canChange = true
            //check for last entry if there no prob --> else add a new entry
            data = await AddProcessProg(childId)
        }
    }else if(Status=="DONE"){
        val1 = await GetNoOfProcessFromProcProg(childId)
        child = await GetChildById(childId)
        val2 = await GetNoOfProcessFromCat(child.category)
        console.log(val1,val2)
        if(val1==val2){
            canChange = true
        }
    }else{
        canChange = true
    }
    if(canChange){
        ChangeStatus(childId,Status)
    }
    
    return canChange
}

module.exports = { validateChild,saveChildService,changeStatus }