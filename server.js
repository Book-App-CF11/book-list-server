const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const pg = require('pg');
const app = express();
const CLIENT_URL ='https:book-app-cf11.github.io/book-list-client';

const DATABASE_URL = 'postgres://qbxtkvykramezd:e1d58eba8ca4499c234ea331951d3384dc3e245326332e812436b262697bc0a9@ec2-107-20-151-189.compute-1.amazonaws.com:5432/dbve8u2n9ji5id';

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => {
  console.error(err);
});

app.use(cors());

app.get('/', (req, res) => res.redirect(CLIENT_URL));

app.get('/api/v1/books', (req, res) => {
  client.query(`
SELECT (book_id, title, author, image_url) FROM books;`)
    .then(result => res.send(result.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log('listening on PORT', PORT));