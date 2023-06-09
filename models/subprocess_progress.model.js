module.exports = (sequelize,DataTypes) =>{
    const SubProcessProgress = sequelize.define("SubProcessProgress",{
      status : {
            type : DataTypes.STRING,
            defaultValue: "NOT DONE",
        },
    },{
        indexes: [
            {
              unique: true,
              fields: ['ProcessId', 'ChildId','SubProcessId'],
            },
          ],
    })
    return SubProcessProgress
}