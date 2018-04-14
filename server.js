const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const pg = require('pg');
const app = express();

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', err => {
  console.error(err);
});

app.get('/books', (req, res) => {
  client.query(`
  SELECT title FROM books;`)
    .then(result => res.send(result.rows));
});

app.listen(PORT, () => console.log('listening on PORT', PORT));