const {promisify} = require('util');
const { getQuery } = require("../models/dbConnection");

const auth = async(req,res,next)=>{
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
            req.user = getQuery("SELECT * FROM user WHERE id = ?",[decoded.id])[0];
            return next();
        }catch(e){
            res.status(401).send("Unauthorized:No token provided");
            console.error(err);
            return next();
        }

    }else{
        next();
    }
}

module.exports =  {auth};

