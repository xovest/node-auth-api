const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json({
    message: 'Wlcm yo'
  });
});

app.listen(PORT, () => console.log(`Da serv iz runnin on port ${PORT}`));