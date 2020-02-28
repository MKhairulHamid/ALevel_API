const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'hamid',
  password : 'hamid123',
  database : 'ALevel_id',
  port     : 3306
});

module.exports = {
    sqlDB : db
}