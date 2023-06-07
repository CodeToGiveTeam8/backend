const { SaveOrphanage, GetOrphanage, GetOrphanageId } = require("../models/repo")

const validateOrphanage = async(data)=>{
    if(!data.name || !data.state || !data.district){
        return false
    }
    if(data.name.length==0 || data.state.length==0 || data.district.length==0){
        return false
    }
    return true
}

const saveOrphanageService = async(data)=>{
    data = await SaveOrphanage(data)
    return data
}

const getOrphanage = async() => {
    data = await GetOrphanage()
    return data
}

const getOrphanageIdService = async(name) => {
    data = await GetOrphanageId(name)
    return data
}

module.exports = { validateOrphanage,saveOrphanageService,getOrphanage,getOrphanageIdService }