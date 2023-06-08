module.exports = (sequelize,DataTypes) =>{
    const Process = sequelize.define("Process",{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING,
        },

    })
    return Process
}