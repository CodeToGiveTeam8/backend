const {promisify} = require('util');
const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token==null){
        res.status(401).json({
            "msg" : "Unauthorized:No token provided"
        });
        return
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
        if(err){
            res.status(401).json({
                "msg" : "Unauthorized:No token provided"
            });
            console.log(err)
            return
        }
        req.userId = data.ID
        req.email = data.email
    })
    return next()
}

module.exports =  {auth};

