const express = require("express");
const {validateOrphanage,saveOrphanageService,getOrphanage} =  require("../services/orphanage.service");

const {auth} = require("../middlewares/index");

const orphanageRouter = express.Router();

orphanageRouter.get("/orphanage",auth,async(req,res)=>{
    //get list of all processes
    data = await getOrphanage()
    return res.status(200).json({
        "data":data
    })
})

orphanageRouter.post("/orphanage/add",auth,async(req,res)=>{
    //check if team admin
    var orphanage = req.body

    if(validateOrphanage(orphanage)){
        r_orphanage = await saveOrphanageService(orphanage)
        if(r_orphanage==null){
            return res.status(400).json({
                "msg" : "Error Saving data"
            })
        }
        return res.status(200).json({
            "msg":"Orphanage added Successfully"
        })
    }else{
        return res.status(400).json({
            "msg" : "Invalid Body Request"
        })
    }

})

module.exports = {orphanageRouter}