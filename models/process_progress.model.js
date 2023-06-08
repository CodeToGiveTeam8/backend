module.exports = (sequelize,DataTypes) =>{
    const ProcessProgress = sequelize.define("ProcessProgress",{
        started_at : {
            type : DataTypes.DATE,
        },
        completed_at : {
            type : DataTypes.DATE,
        },
        status : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
                customValidator(val) {
                    if (val === null || (val!="NOT DONE" && val!="DONE")) {
                      throw new Error('Invalid Status value');
                    }
                  }
            },
        },
        comment : {
            type : DataTypes.STRING,
        },
    },{
        indexes: [
          {
            unique: true,
            fields: ['ProcessId', 'ChildId'],
          },
        ],
      })
    return ProcessProgress
}