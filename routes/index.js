const {userRouter} = require("./user.route");
const {homeRouter} = require("./home.route");
const {childRouter} = require("./child.route")
const {processRouter} = require("./process.route")

module.exports = {homeRouter,userRouter,childRouter,processRouter};