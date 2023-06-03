const mysql = require('my-sql');
const {createConnection} = mysql;

console.log(process.env.DATABASE_HOST);

const balAshaDB= createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

const getQuery = (query,params)=>{
    return new Promise((resolve,reject)=>{
        balAshaDB.query(query,params,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    });
}

const connectDB = ()=>{
    return new Promise((resolve,reject)=>{
        balAshaDB.connect((err)=>{
            if(err){
              reject(err);
            }
            resolve("My SQL Connected!!!");
        })
    });
}

module.exports =  {getQuery,connectDB};