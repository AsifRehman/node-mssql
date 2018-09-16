var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: '007', // update me
    server: 'YAS',
  options: {
      database: 'test',
      port: 60986,
      encrypt: false,
      instance: 'SQLEXPRESS'
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});