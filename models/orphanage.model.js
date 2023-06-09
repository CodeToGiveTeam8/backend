module.exports = (sequelize,DataTypes) =>{
    const Orphanage = sequelize.define("Orphanage",{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique: true,
        },
        state : {
            type : DataTypes.STRING,
            defaultValue: "NA",
        },
        district : {
            type : DataTypes.STRING,
            defaultValue: "NA",
        },

    })
    return Orphanage
}