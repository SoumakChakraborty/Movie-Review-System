var mysql=require("mysql");
var conn=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"Windows90#",
    database:"movie"
});
module.exports=conn;