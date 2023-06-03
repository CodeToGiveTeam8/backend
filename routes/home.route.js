const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/",(req,res)=>{
    console.log("home route is triggered");
})


module.exports = {homeRouter}