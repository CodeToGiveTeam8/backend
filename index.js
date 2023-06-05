const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")

require('dotenv').config();

//Middlewares
const {auth} = require('./middlewares');

//Routes
const {userRouter,homeRouter} = require("./routes");

//DB Models
const db = require('./models')

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(auth);
app.use(userRouter);
app.use(homeRouter);

db.sequelize.sync().then((req)=>{
    app.listen(port,()=>{
        console.log(`listening in port ${port}`);
    });
})