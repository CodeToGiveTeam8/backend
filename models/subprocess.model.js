module.exports = (sequelize,DataTypes) =>{
    const SubProcess = sequelize.define("SubProcess",{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },

    })
    return SubProcess
}