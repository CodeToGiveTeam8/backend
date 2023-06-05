const jwt = require('jsonwebtoken');
const { GetUserByEmail } = require('../models/user.repo');

const auth = async(req,res,next)=>{
    
    const authHeader = req.headers['authorization']
    const token = authHeader ? authHeader : undefined


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
        return next()
    }
}

module.exports =  {auth};

