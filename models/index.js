'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  config.logging =  console.log
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  config.logging =  console.log
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const User = require("./user.model.js")(sequelize, Sequelize)
const Child = require("./child.model.js")(sequelize, Sequelize)
const Team = require("./team.model.js")(sequelize, Sequelize)
const Orphanage = require("./orphanage.model.js")(sequelize, Sequelize)
const Process = require("./process.model.js")(sequelize, Sequelize)
const ProcessProgress = require("./process_progress.model.js")(sequelize, Sequelize)
const CategoryProcess = require("./category_process.model.js")(sequelize, Sequelize)
const ProcessDocument = require("./process_document.model.js")(sequelize, Sequelize)
const DocumentsUploaded = require("./documents_uploaded.model.js")(sequelize, Sequelize)
const SubProcess = require("./subprocess.model.js")(sequelize, Sequelize)
const SubProcessProgress = require("./subprocess_progress.model.js")(sequelize, Sequelize)


User.hasMany(Child)

User.hasMany(Team,{
  foreignKey: "managerId", // change column name
  sourceKey: "id", // change the referenced column
  uniqueKey: "manager_user_fk",
})
User.hasOne(Team,{
  foreignKey: "grassrootId", // change column name
  sourceKey: "id", // change the referenced column
  uniqueKey: "grassroot_user_fk",
})

Orphanage.hasOne(Child)

Process.hasMany(ProcessProgress)
Child.hasMany(ProcessProgress,{
  foreignKey: 'ChildId',
})

Process.hasMany(CategoryProcess)

Process.hasMany(ProcessDocument)

Child.hasMany(DocumentsUploaded,{
  foreignKey: 'ChildId',
})
Process.hasMany(DocumentsUploaded)

Process.hasMany(SubProcess)

Child.hasMany(SubProcessProgress,{
  foreignKey: 'ChildId',
})
Process.hasMany(SubProcessProgress)
SubProcess.hasMany(SubProcessProgress)


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = User;
db.child = Child;
db.team = Team;
db.orphanage = Orphanage;
db.process = Process
db.processProgress = ProcessProgress;
db.categoryProcess = CategoryProcess;
db.processDocument = ProcessDocument;
db.documentsUploaded = DocumentsUploaded;
db.subProcess = SubProcess
db.subProcessProgress = SubProcessProgress

module.exports = db;