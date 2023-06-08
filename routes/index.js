const {userRouter} = require("./user.route");
const {homeRouter} = require("./home.route");
const {childRouter} = require("./child.route")
const {processRouter} = require("./process.route")
const {orphanageRouter} = require("./orphanages.route")
const {documentsUploadedRouter} = require("./documents_uploaded.route");
const { subtaskRouter } = require("./subtask.route");

module.exports = {homeRouter,userRouter,childRouter,processRouter,orphanageRouter,documentsUploadedRouter,subtaskRouter};