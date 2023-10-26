const mysql = require('mysql');
var conn = mysql.createConnection({ 
    host : 'localhost',  
    user : 'root',
    password : '1234',
    database : 'test1'
  });

  conn.connect(); // mysql과 연결

  var sql = 'select * from topic'
  conn.query(sql, function(err, rows, fields)
  {
      if (err) {
          console.error('error connecting: ' + err.stack);
      }
      console.log(rows);
          
  });
  conn.end(); // 연결 해제