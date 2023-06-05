const {SaveUser,GetUserByEmail} = require("../models/user.repo")

const validateUser = (user)=>{
    if( user.name.length==0 || user.password.length<=3 || user.gender.length==0 || user.email.length==0 || (user.role!="GRASSROOT" && user.role!="CASE MANAGER" && user.role!="OPERATION")){
        return false
    }
    return true
}

const saveUserService = async(user)=>{
    user = await SaveUser(user)
    return user
}

const checkValidUser = async(user)=>{
    db_user = await getUserByEmail(user.email)
    if (db_user.password == user.password){
        return true
    }
    return false
}

const getUserByEmail = async(email)=>{
    user = await GetUserByEmail(email)
    return user
}

module.exports = {validateUser,saveUserService,checkValidUser,getUserByEmail}