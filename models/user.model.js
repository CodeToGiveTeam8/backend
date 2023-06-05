module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define("User",{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
            unique: true,
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
        role : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
                customValidator(val) {
                    if (val === null || (val!="GRASSROOT" && val!="CASE MANAGER" && val!="OPERATION")) {
                      throw new Error('Invalid Role value');
                    }
                  }
            },
        },
        dob : {
            type : DataTypes.DATE,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        },
        photo : {
            type : DataTypes.BLOB,
            allowNull : true,
        },
        mobile:{
            type: DataTypes.STRING,
            allowNull:true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            },
        }
    })
    return User
}