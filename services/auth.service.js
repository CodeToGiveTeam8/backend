const jwt = require('jsonwebtoken')

const genWebToken = (user)=>{
    const userEmail = user.email
    const userId = user.ID

    const tokenUser = { email : userEmail, ID : userId }
    const accessToken = jwt.sign(tokenUser,process.env.JWT_SECRET)

    return accessToken
    
}

module.exports = {genWebToken}