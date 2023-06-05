module.exports = (sequelize,DataTypes) =>{
    const DocumentsUploaded = sequelize.define("DocumentsUploaded",{
        document_url : {
            type : DataTypes.STRING,
            allowNull : false,
        },
    })
    return DocumentsUploaded
}