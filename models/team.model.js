module.exports = (sequelize,DataTypes) =>{
    const Team = sequelize.define("Team",{
        managerId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        grassrootId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }

    })
    return Team
}