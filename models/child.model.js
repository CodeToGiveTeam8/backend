module.exports = (sequelize,DataTypes) =>{
    const Child = sequelize.define("Child",{
        childId : {
            type : DataTypes.STRING,
            primaryKey: true
        },
        name : {
            type : DataTypes.STRING,
            defaultValue: "UNKNOWN",
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
        photo : {
            type : DataTypes.BLOB,
            allowNull : true,
        },
        category : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
                customValidator(val) {
                    if (val === null || (val!="ABANDONED" && val!="SURRENDERED" && val!="ORPHANED" && val!="CHILD ADMITTED IN CCI BY FAMILY")) {
                      throw new Error('Invalid Category Name');
                    }
                  }
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
                customValidator(val) {
                    if (val === null || (val!="NOT STARTED" && val!="DONE" && val!="WORKING")) {
                      throw new Error('Invalid Status value');
                    }
                  }
            },
            defaultValue: "NOT STARTED",
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