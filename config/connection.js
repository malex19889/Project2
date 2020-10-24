// require mysql
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER,
    password: process.env.MYSQLPW,
    database: process.env.DB
});

connection.connect(function(err){
    if(err){
        throw err
    }
    console.log("connected as id "+ connection.threadId);
})

// export connection
module.exports = connection;