module.exports = (sequelize,DataTypes) =>{
    const Orphanage = sequelize.define("Orphanage",{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique: true,
        },
        state : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        district : {
            type : DataTypes.STRING,
            allowNull : false,
        },

    })
    return Orphanage
}