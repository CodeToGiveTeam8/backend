module.exports = (sequelize,DataTypes) =>{
    const CategoryProcess = sequelize.define("CategoryProcess",{
        category : {
            type : DataTypes.STRING,
            allowNull : false,
            unique: true,
        },
        orderNo : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },

    })
    return CategoryProcess
}