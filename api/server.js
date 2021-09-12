const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = 8080;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

// add image
app.post('/image', (req, res) => {
  //TODO
});

// search for image
app.get('/image', (req, res) => {
  //TODO
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
  app,
};
