module.exports = (sequelize,DataTypes) =>{
    const DocumentsUploaded = sequelize.define("DocumentsUploaded",{
        document_name : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    })
    return DocumentsUploaded
}