const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = 8080;

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
  charset: 'utf8',
});

// add image
app.post('/image', (req, res) => {
  //TODO
});

// search for image
app.get('/image', (req, res) => {
  connection.query('SELECT * FROM images', (error, results) => {
    error ? res.send(error) : res.send(results[0]);
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
  app,
};
