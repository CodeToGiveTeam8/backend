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
        },
        comment : {
            type : DataTypes.STRING,
        },

    })
    return ProcessProgress
}