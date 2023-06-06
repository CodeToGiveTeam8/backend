const express = require("express");
const {auth} = require("../middlewares/index")
const {getUserHomeDetails} =  require("../services/user.service")

const homeRouter = express.Router();

homeRouter.get("/home",auth,async(req,res)=>{
    details = await getUserHomeDetails(req.userData)
    return res.json({
        "data" : details
    })
})

module.exports = {homeRouter}