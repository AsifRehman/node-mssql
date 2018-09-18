var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var sqlConfig = {
    userName: 'sa', // update me
    password: '007', // update me
    server: 'SERVER\\SQL2014',
    database: 'IM',
    port: 56058,
    options: {
        encrypt: false
    }
  }

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

app.get('/customers', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from dbo.tbl_partytype', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})