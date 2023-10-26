// config/db_config.js
module.exports = {
    host : 'localhost',  
    user : 'root',
    password : '1234',
    database : 'example'
};
const mysql = require('mysql');
const express = require('express');
const app = express();
const dbconfig   = require('./db.js');
const conn = mysql.createConnection(dbconfig);

app.get('/topic',function(req, res){
	conn.connect(); // mysql과 연결s        

    var sql = 'select * from topic'
    conn.query(sql, function(err, rows, fields)
    {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        res.send(rows);
            
    });
    conn.end(); // 연결 해제
}); 
 
app.listen(3010, function(){
	console.log('Listening at 3010');
});