const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hamid',
  password : 'hamid123',
  database : 'ALevel_id',
  port     : 3306
});

module.exports = {
    sqlDB : connection
}