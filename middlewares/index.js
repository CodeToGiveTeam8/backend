const jwt = require('jsonwebtoken');
const { GetUserByEmail } = require('../models/repo');

const auth = async(req,res,next)=>{
    
    const authHeader = req.headers['authorization']
    // const token = authHeader ? authHeader : undefined
    const token = authHeader && authHeader.split(' ')[1]

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,data)=>{
            if(err){
                res.status(401).json({
                    "msg" : "Unauthorized:No token provided"
                });
                console.log(err)
                return
            }
            const email = data.email
            const userData = await GetUserByEmail(email)
            req.userData = userData
            return next();
        })
    }else{
        res.status(401).json({
            "msg" : "Unauthorized:No token provided"
        });
        return
    }
}

module.exports =  {auth};

