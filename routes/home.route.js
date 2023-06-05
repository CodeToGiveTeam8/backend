const express = require("express");
const {auth} = require("../middlewares/index")
const homeRouter = express.Router();

homeRouter.get("/",auth,(req,res)=>{
    res.json({
        "msg" :  "Home"
    })
})

module.exports = {homeRouter}