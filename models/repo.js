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

const GetUserByID = async(id)=>{
    user = await db.user.findOne({ where: { id: id } })
    if (user === null) {
        return false
      } else {
        return user
      }
}

const GetOrphanageId = async(name)=>{
    data = await db.orphanage.findOne({ where: { name: name } })
    if (data === null) {
        return -1
      } else {
        return data.id
      }
}

const GetOrphanageByName = async(id)=>{
    data = await db.orphanage.findOne({ where: { id: id } })
    if (data === null) {
        return null
      } else {
        return data
      }
}

const GetGrassRootHome = async(id)=>{
    childDetails = await db.child.findAll({ where: { userId: id } })
    if (childDetails === null) {
        return null
    } else {
        for (let i = 0; i < childDetails.length; i++) {
            userDetail = await GetUserByID(childDetails[i].UserId)
            orphanageDetail = await GetOrphanageByName(childDetails[i].OrphanageId)
            childDetails[i].dataValues.user_name = userDetail.name
            childDetails[i].dataValues.user_email = userDetail.email
            childDetails[i].dataValues.orphanage = orphanageDetail.name

          }
        return childDetails
    }
}

const GetTeamLeadHome = async()=>{
    childDetails = await db.child.findAll({})
    if (childDetails === null) {
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
      enrollment_date : child.enrollment_date,
      OrphanageId : child.OrphanageId,
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
    console.log(data)
    return await db.processDocument.create({
        name : data.name,
        description: data.description,
        ProcessId : data.ProcessId
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
    console.log(data)
    db.categoryProcess.findAll({
        where: {
            category : data.category,
            orderNo: {
            [db.Sequelize.Op.gte]: data.order_no,
          },
        },
      })
        .then((results) => {
          // Update the column values by adding the previous value
          results.forEach((row) => {
            const previousValue = row.orderNo;
            const updatedValue = previousValue + 1;
            row.orderNo = updatedValue;
            row.save();
          });
          console.log('Rows updated successfully.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    return await db.categoryProcess.create({
        ProcessId : data.processId,
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

const SaveOrphanage = async(data) => {
    return await db.orphanage.create({
        name : data.name,
        state: data.state,
        district : data.district
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

const GetOrphanage = async() => {
    orphanage = await db.orphanage.findAll({})
    if (orphanage === null) {
        return null
    } else {
        return orphanage
    }
}

const SaveSubProcessService = async(data) => {
    return await db.subProcess.create({
        name : data.name,
        ProcessId: data.ProcessId,
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

const GetCategoryProcess = async(category) => {
    res = []
    await db.categoryProcess.findAll({
        where: { category: category },
        order: [['orderNo', 'ASC']], // Order by columnName in ascending order
      })
        .then((results) => {
            res = results
        })
        .catch((error) => {
            console.log(error)
            return []
        });
    return res
}

const GetProcessByID = async(id) => {
    res = []
    await db.process.findAll({
        where: { id: id },
      })
        .then((results) => {
            res = results
        })
        .catch((error) => {
            console.log(error)
        });
    return res
}

const GetSubProcessByID = async(processId) => {
    res = []
    await db.subProcess.findAll({
        where: { ProcessId: processId },
      })
        .then((results) => {
            res = results
        })
        .catch((error) => {
            console.log(error)
        });
    return res
}

module.exports = {SaveUser,GetUserByEmail,GetGrassRootHome,GetTeamLeadHome,SaveChild,SaveProcess,SaveProcessDocument,SaveCategoryProcess,SaveOrphanage,GetOrphanage,GetOrphanageId,SaveSubProcessService,GetCategoryProcess,GetProcessByID,GetSubProcessByID}