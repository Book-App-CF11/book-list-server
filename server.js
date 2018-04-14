const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => console.log('listening on PORT', PORT));