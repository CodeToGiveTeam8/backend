module.exports = (sequelize,DataTypes) =>{
    const ProcessDocument = sequelize.define("ProcessDocument",{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING,
        },
    })
    return ProcessDocument
}