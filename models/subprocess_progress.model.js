module.exports = (sequelize,DataTypes) =>{
    const SubProcessProgress = sequelize.define("SubProcessProgress",{},{
        indexes: [
            {
              unique: true,
              fields: ['ProcessId', 'ChildId','SubProcessId'],
            },
          ],
    })
    return SubProcessProgress
}