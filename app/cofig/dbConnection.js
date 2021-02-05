const mysql = require("mysql");
require('dotenv').config();//{path:'../../.env'} 

const connection = mysql.createConnection({
    
    host: process.env.DB_ADMIN_HOST,
    port: process.env.DB_ADMIN_PORT,//port
    user: process.env.DB_ADMIN_USER_NAME,//username
    password:  process.env.MYSQL_ADMIN_PWD,//password
    database: process.env.NAME_DB_ADMIN//database
    
  });

//Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error in db USER connecting: " + err.stack);
    return;
  }
  console.log("db USER connected as id " + connection.threadId);
});


module.exports = connection;
