module.exports = (sequelize,DataTypes) =>{
    const CategoryProcess = sequelize.define("CategoryProcess",{
        category : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        orderNo : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },

    })
    return CategoryProcess
}