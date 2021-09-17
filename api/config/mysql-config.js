const mysql = require('mysql');

const dbName = process.env.NODE_ENV === 'test' ? 'test' : 'image_repository';

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: dbName,
  charset: 'utf8',
});

module.exports = connection;
