const {SaveUser,GetUserByEmail,GetGrassRootHome,GetTeamLeadHome,GetTeamLeadByEmail,AddToTeam} = require("../models/repo")

const validateUser = (user)=>{
    if( user.name.length==0 || user.password.length<=3 || user.gender.length==0 || user.email.length==0 || (user.role!="GRASSROOT" && user.role!="TEAM LEAD" && user.role!="OPERATION")){
        console.log("Here")
        return false
    }

    if(user.role=="GRASSROOT" && user.team_lead.length==0){
        return false
    }

    return true
}

const saveUserService = async(user)=>{
    r_data = null
    if(user.role=="GRASSROOT"){
        r_data = await GetTeamLeadByEmail(user.team_lead)
        if(r_data==null){
            return {
                error : true,
                msg : "Enter valid Team Lead"
            }
        }
    }
    user = await SaveUser(user)
    if(r_data!=null && user.role=="GRASSROOT"){
        user_data = await GetUserByEmail(user.email)
        AddToTeam(r_data.id,user_data.id)
    }
    if(user==null){
        return {
            error : true,
            msg : "Email Already Exist"
        }
    }
    return {
        error : false,
        msg : "Added Successfully"
    }
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

const getUserHomeDetails = async(user)=>{
    if(user.role == "GRASSROOT"){
        //get details only from his cases
        childDetails = await GetGrassRootHome(user.id)
        console.log(childDetails)
        return childDetails
    }else if(user.role == "TEAM LEAD" || user.role == "OPERATION"){
        //get all data's
        childDetails = await GetTeamLeadHome()
        return childDetails
    }
}

module.exports = {validateUser,saveUserService,checkValidUser,getUserByEmail,getUserHomeDetails}