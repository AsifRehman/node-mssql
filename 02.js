var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: '007',
        server: 'localhost\\SQL2014', 
        database: 'IM' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from tbl_partyCateg', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            sql.close();
        });
    });
});

app.get('/partytypes', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: '007',
        server: 'localhost\\SQL2014', 
        database: 'IM',
        options: {
            encrypt: false
        }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from tbl_PartyType', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            sql.close();
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});