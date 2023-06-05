const User = require("./user.model")
module.exports = (sequelize,DataTypes) =>{
    const Child = sequelize.define("Child",{
        name : {
            type : DataTypes.STRING,
        },
        dob : {
            type : DataTypes.DATE,
        },
        gender : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
                customValidator(val) {
                    if (val === null || (val!="MALE" && val!="FEMALE" && val!="OTHER")) {
                      throw new Error('Invalid Gender value');
                    }
                  }
            },
        },
        profile_image_url : {
            type : DataTypes.STRING,
        },
        category : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        },
        city : {
            type : DataTypes.STRING,
        },
        state : {
            type : DataTypes.STRING,
        },
        start_date : {
            type : DataTypes.DATE,
        },
        end_date : {
            type : DataTypes.DATE,
        },
        description : {
            type : DataTypes.STRING,
        },
        status : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        },
        enrollment_date : {
            type : DataTypes.DATE,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        }

    })
    return Child
}