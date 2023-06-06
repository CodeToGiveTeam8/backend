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

const GetGrassRootHome = async(id)=>{
    childDetails = await db.child.findAll({ where: { userId: id } })
    if (user === null) {
        return null
    } else {
        return childDetails
    }
}

const GetTeamLeadHome = async()=>{
    childDetails = await db.child.findAll({})
    if (user === null) {
        return null
    } else {
        return childDetails
    }
}

const SaveChild = async(child) => {
    //db.sequelize.query(`INSERT INTO Users (name, password, email, gender, role, dob, profile_image_url) values ('${user.name}','${user.password}','${user.email}','${user.gender}','${user.role}','${user.dob}','${user.profile_image_url}')`);
    return await db.child.create({
      UserId : child.UserId,
      childId : child.childId,
      name: child.name,
      dob: child.dob,
      gender : child.gender,
      photo : child.photo,
      category : child.category,
      city: child.city,
      state : child.state,
      start_date : child.start_date,
      end_date : child.end_date,
      description : child.description,
      status : child.status,
      enrollment_date : child.enrollment_date
  }).then(function (child) {
      if (child) {
          return child
      } else {
          return null
      }
  }).catch((err)=>{
      console.log(err)
      return null
  });
};

const SaveProcess = async(process) => {
    //db.sequelize.query(`INSERT INTO Users (name, password, email, gender, role, dob, profile_image_url) values ('${user.name}','${user.password}','${user.email}','${user.gender}','${user.role}','${user.dob}','${user.profile_image_url}')`);
    return await db.process.create({
      name : process.name,
      timeline : process.timeline,
      description: process.description,
  }).then(function (process) {
      if (process) {
          return process
      } else {
          return null
      }
  }).catch((err)=>{
      console.log(err)
      return null
  });
};

const SaveProcessDocument = async(data) => {
    return await db.processDocument.create({
        name : data.name,
        description: data.description,
        processId : data.processId
    }).then(function (data) {
        if (data) {
            return data
        } else {
            return null
        }
    }).catch((err)=>{
        console.log(err)
        return null
    });
}

const SaveCategoryProcess = async(data) => {
    return await db.categoryProcess.create({
        processId : data.processId,
        category: data.category,
        orderNo : data.order_no
    }).then(function (data) {
        if (data) {
            return data
        } else {
            return null
        }
    }).catch((err)=>{
        console.log(err)
        return null
    });
}

module.exports = {SaveUser,GetUserByEmail,GetGrassRootHome,GetTeamLeadHome,SaveChild,SaveProcess,SaveProcessDocument,SaveCategoryProcess}