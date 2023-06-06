const db = require('./index');
const moment = require("moment")

const SaveUser = async(user) => {
    //db.sequelize.query(`INSERT INTO Users (name, password, email, gender, role, dob, profile_image_url) values ('${user.name}','${user.password}','${user.email}','${user.gender}','${user.role}','${user.dob}','${user.profile_image_url}')`);
    return await db.user.create({
      name: user.name,
      password: user.password,
      email: user.email,
      gender : user.gender,
      role : user.role,
      dob : user.dob,
      mobile:user.mobile,
      photo : user.photo,
  }).then(function (users) {
      if (users) {
          return user
      } else {
          return null
      }
  }).catch((err)=>{
      console.log(err)
      return null
  });
  };

const GetUserByEmail = async(email)=>{
    user = await db.user.findOne({ where: { email: email } })
    if (user === null) {
        return false
      } else {
        return user.dataValues
      }
}

module.exports = {SaveUser,GetUserByEmail}