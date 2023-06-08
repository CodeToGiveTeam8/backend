const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
var cors = require('cors')
const {createBucketIfNotExist} = require("./minio_services/minio.service")

require('dotenv').config();

//Middlewares
const {auth} = require('./middlewares');

//Routes
const {userRouter,homeRouter,childRouter,processRouter, orphanageRouter,subtaskRouter,documentsUploadedRouter} = require("./routes");

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
app.use(orphanageRouter);
app.use(subtaskRouter);
app.use(documentsUploadedRouter);

db.sequelize.sync().then((req)=>{
    createBucketIfNotExist()
    app.listen(port,()=>{
        console.log(`listening in port ${port}`);
    });
})