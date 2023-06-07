const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
var cors = require('cors')

require('dotenv').config();

//Middlewares
const {auth} = require('./middlewares');

//Routes
const {userRouter,homeRouter,childRouter,processRouter, orphanageRouter} = require("./routes");

//DB Models
const db = require('./models')

const port = 8081;
const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(auth);
app.use(userRouter);
app.use(homeRouter);
app.use(childRouter);
app.use(processRouter);
app.use(orphanageRouter)

db.sequelize.sync().then((req)=>{
    app.listen(port,()=>{
        console.log(`listening in port ${port}`);
    });
})