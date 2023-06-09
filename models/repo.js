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

const GetTeamLeadByEmail = async(email)=>{
    user = await db.user.findOne({ where: { email: email, role : "TEAM LEAD" } })
    if (user === null) {
        return null
      } else {
        return user.dataValues
      }
}

const GetUserByEmail = async(email)=>{
    user = await db.user.findOne({ where: { email: email } })
    if (user === null) {
        return null
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

const AddToTeam = async(teamLeadId,userId)=>{
    console.log("Adding to team")
    return await db.team.create({
        managerId: teamLeadId,
        grassrootId: userId,
    }).then(function (teamData) {
        if (teamData) {
            return teamData
        } else {
            return null
        }
    }).catch((err)=>{
        console.log(err)
        return null
    });
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

const SaveChild = async(child) => {
    //db.sequelize.query(`INSERT INTO Users (name, password, email, gender, role, dob, profile_image_url) values ('${user.name}','${user.password}','${user.email}','${user.gender}','${user.role}','${user.dob}','${user.profile_image_url}')`);
    Object.keys(child).forEach((key) => {
        if (child[key].length === 0) {
          delete child[key];
        }
      });
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
        SubProcessId : data.SubProcessId
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

const ChangeStatus = async(childId,Status)=>{
    await db.child.findAll({
        where: {
            childId : childId,
        },
      })
        .then((results) => {
          // Update the column values by adding the previous value
          results.forEach((row) => {
            row.status = Status;
            row.save();
          });
          console.log('Status Updated successfully.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}

const ProcessProgressCheck = async(childId)=>{
    
    data = await db.processProgress.findAll({
        where: {
            ChildId : childId,
        },
      })
        
    return data
}

const GetPrevStatus = async(childId)=>{
    data = await db.child.findOne({
        where: {
            childId : childId,
        },
      })

    return data.dataValues.status
}

const GetNoOfProcessFromProcProg = async(childId)=>{
    data = await db.processProgress.findAll({
        where: {
            ChildId : childId,
            status : "DONE"
        },
      })

    return data.length
}

const GetChildById = async(childId)=>{
    data = await db.child.findOne({
        where: {
            childId : childId,
        },
      })

    return data
}

const GetNoOfProcessFromCat = async(category)=>{
    data = await db.categoryProcess.findAll({
        where: {
            category : category,
        },
      })

    return data.length
}

const GetProcessProgress = async(child_id,process_id)=>{
    data = await db.processProgress.findOne({
        where: {
            ChildId : child_id,
            ProcessId : process_id
        },
      })
    return data
}

const SaveProcessProg = async(data)=>{
    return await db.processProgress.create({
        ChildId: data.childId,
        ProcessId: data.ProcessId,
        status: data.status,
        started_at : data.started_at,
        completed_at : data.completed_at,
        status : data.status,
        comment : data.comment,
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
}

const AddSubTask = async(data)=>{
    return await db.subProcessProgress.create({
        ChildId: data.ChildId,
        ProcessId: data.ProcessId,
        SubProcessId: data.SubProcessId
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

const AddProcessProg = async(childId)=>{
    child = await GetChildById(childId)
    data = await GetCategoryProcess(child.category)

    for(const process of data) {
        process_id = process.ProcessId
        proces_prog = await GetProcessProgress(childId,process_id)
        if(proces_prog!=null && proces_prog.status!="DONE"){
            break
        }
        if(proces_prog==null){
            const currentDate = new Date().toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });
            
            const [day, month, year] = currentDate.split('/');
            const formattedDate = `${year}:${month}:${day}`;

            n_process_prog = {
                childId : childId,
                ProcessId : process_id,
                status : "NOT DONE",
                started_at : formattedDate,
            }

            new_proc_prog = await SaveProcessProg(n_process_prog)
            for(const subProc of await GetSubProcessByID(process_id)){
                await AddSubTask({
                    ChildId : childId,
                    ProcessId : process_id,
                    SubProcessId : subProc.id
                })
            }

            return new_proc_prog
        }    

    }

    return null

}

const AddDocumentUploaded = async(data)=>{
    currentDate = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    
    const [day, month, year] = currentDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    currentDate = new Date()
    const UpdateDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')

    doc_data = {
        ChildId: data.ChildChildId,
        SubProcessId: data.SubProcessId,
        document_name: data.name,
        updated_at : formattedDate
    }

    console.log(doc_data)
    
    return await db.sequelize.query(`INSERT INTO DocumentsUploadeds (id,document_name,createdAt,updatedAt,ChildId,SubProcessId) VALUES (DEFAULT,'${doc_data.document_name}','${UpdateDate}','${UpdateDate}','${doc_data.ChildId}',${doc_data.SubProcessId})`, {
        logging: console.log,
      })
    
    // return await db.documentsUploaded.create(doc_data).then(function (data) {
    //     if (data) {
    //         return data
    //     } else {
    //         return null
    //     }
    // }).catch((err)=>{
    //     console.log(err)
    //     return null
    // });

}

const GetDocumentsUploaded = async(childId,subProcessId)=>{
    data = await db.documentsUploaded.findAll({
        where: {
            ChildId : childId,
            SubProcessId : subProcessId
        },
      })
    return data
}

const GetDocumentUploadedById = async(docId)=>{
    console.log(docId)
    data = await db.documentsUploaded.findOne({
        where: {
            id : docId,
        },
      })
    return data
}

const DeleteDocumentUploaded = async(docId)=>{
    data = await db.documentsUploaded.destroy({
        where: {
            id : docId,
        },
      })

    return data
}

const DoneSubTask = async(data)=>{
    console.log({
        ChildId: data.ChildId,
        ProcessId: data.ProcessId,
        SubProcessId: data.SubProcessId
    })
    return await db.subProcessProgress.update({status : "DONE"},{
        where : {
            ChildId: data.ChildId,
            ProcessId: data.ProcessId,
            SubProcessId: data.SubProcessId
        }
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

const NotDoneSubTask = async(data)=>{
    return await db.subProcessProgress.update({ status : "NOT DONE" },{
        where : {
            ChildId: data.childId,
            SubProcessId: data.subProcessId
        }
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

const GetSubProcessCount = async(ProcessId)=>{
    data = await db.subProcess.findAll({
        where: {
            ProcessId : ProcessId,
        },
      })

    return data.length
}

const GetSubProcessProgCount = async(ProcessId,ChildChildId)=>{
    data = await db.subProcessProgress.findAll({
        where: {
            ProcessId : ProcessId,
            ChildId : ChildChildId,
            status : "DONE"
        },
      })

    return data.length
}

const GetProcessDocumentsCount = async(SubProcessId)=>{
    data = await db.processDocument.findAll({
        where: {
            SubProcessId : SubProcessId,
        },
      })

    return data.length
}

const GetDocumentsUploadedCount = async(SubProcessId,ChildChildId)=>{
    data = await db.documentsUploaded.findAll({
        where: {
            SubProcessId : SubProcessId,
            ChildId : ChildChildId
        },
      })

    return data.length
}

const ChangeProgStatus = async(child_id,process_id,statusVal)=>{
    console.log({
        ChildId : child_id,
        ProcessId : process_id
    })
    await db.processProgress.findAll({
        where: {
            ChildId : child_id,
            ProcessId : process_id
        },
      })
        .then((results) => {
          // Update the column values by adding the previous value
          results.forEach((row) => {
            row.status = statusVal;
            row.save();
          });
          console.log('Status Updated successfully for process_prog.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });

}

const GetDocumentsBySubprocessId = async(id)=>{
    data = await db.processDocument.findAll({
        where: {
            SubProcessId : id,
        },
      })

    return data
}

const GetFinishedProg = async(childId)=>{
    let var1 = await db.processProgress.findAll({
        where: {
            ChildId : childId,
            Status : "DONE"
        },
      })

      for(let i=0;i<var1.length;i++){
        let sub_var1_data = await db.subProcessProgress.findAll({
            where: {
                ProcessId : var1[i].dataValues.ProcessId,
                Status : "DONE",
                ChildId : childId
            },
          })
            if(sub_var1_data){
                var1[i].dataValues.subProcess = sub_var1_data
            }
    }
    return var1
}

const GetCurrentlyWorkingProg = async(childId)=>{
    let var2 = await db.processProgress.findAll({
        where: {
            ChildId : childId,
            Status : "NOT DONE"
        },
      })
    
      for(let i=0;i<var2.length;i++){
        let sub_var2_data = await db.subProcessProgress.findAll({
            where: {
                ChildId : childId,
                ProcessId : var2[i].dataValues.ProcessId
            },
          })
            if(sub_var2_data){
                var2[i].dataValues.subProcess = sub_var2_data
            }
    }
    return var2

}

const checkIfProcessIdInProg = async(childId,processId)=>{
    let temp_data = await db.processProgress.findOne({
        where: {
            ChildId : childId,
            ProcessId : processId
        },
      })

    if(temp_data!=null){
        return true
    }

    return false
}

const GetProcessDetails = async(processId)=>{
    let p_data = await db.process.findOne({
        where: {
            id : processId
        },
      })
    
      console.log(p_data)

    if(p_data!=null){
        let subp_data = await db.subProcess.findAll({
            where: {
                ProcessId : processId
            },
          })
        if(subp_data){
            p_data.dataValues.subProcess = subp_data
        }
    }

    return p_data
}

const GetDataNotStartedProg = async(childId)=>{
    let child_data = await GetChildById(childId)
    if(child_data){
        let cat_prog = await GetCategoryProcess(child_data.category)
        let r_arr = []
        for(ele of cat_prog){
            if(!await checkIfProcessIdInProg(childId,ele.dataValues.ProcessId)){
                r_arr.push(await GetProcessDetails(ele.dataValues.ProcessId))
            }
        }
        return r_arr
    }
    return []
}

module.exports = {SaveUser,GetUserByEmail,GetGrassRootHome,AddToTeam,
    GetTeamLeadHome,SaveChild,SaveProcess,SaveProcessDocument,SaveCategoryProcess,
    SaveOrphanage,GetOrphanage,GetOrphanageId,SaveSubProcessService,GetCategoryProcess,
    GetProcessByID,GetSubProcessByID,ChangeStatus,ProcessProgressCheck,GetPrevStatus,
    GetNoOfProcessFromProcProg,GetChildById,GetNoOfProcessFromCat,AddProcessProg,SaveProcessProg,
    AddDocumentUploaded,GetDocumentsUploaded,GetDocumentUploadedById,DeleteDocumentUploaded,
    DoneSubTask,NotDoneSubTask,GetSubProcessCount,GetSubProcessProgCount,GetProcessDocumentsCount,
    GetDocumentsUploadedCount,ChangeProgStatus,GetTeamLeadByEmail,GetDocumentsBySubprocessId,
    GetFinishedProg,GetCurrentlyWorkingProg,GetDataNotStartedProg}