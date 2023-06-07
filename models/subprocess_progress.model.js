module.exports = (sequelize,DataTypes) =>{
    const SubProcessProgress = sequelize.define("SubProcessProgress",{
        isDone : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

    })
    return SubProcessProgress
}