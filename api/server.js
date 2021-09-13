const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
  charset: 'utf8',
});

const app = express();
app.use(express.json());
app.use(cors());

// add image
app.post('/image', (req, res) => {
  const { url, title, tags } = req.body;
  connection.query(
    `INSERT INTO images (image_url, image_title, image_labels) VALUES("${url}", "${title}", "${tags}")`,
    (error, results) => {
      if (error) {
        res.status(500);
        res.json();
      } else {
        res.status(201);
        res.json();
      }
    }
  );
});

// search for image
app.get('/image', (req, res) => {
  connection.query('SELECT * FROM images', (error, results) => {
    error ? res.send(error) : res.send(results);
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
  app,
};
