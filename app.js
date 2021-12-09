const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json({
    message: 'Wlcm yo'
  });
});

app.post('/api/posts', (req, res) => {
  res.json({
    message: 'post created dude'
  });
});

app.post('/api/login', (req, res) => {
  //creating a user
  const user = {
    id : 1,
    username: 'ryan',
    email: 'ryan@gmail.com',
  };

  jwt.sign({user}, 'secretkey', async (err, token) => {
    await res.json({
      token
    });
  });
});

app.listen(PORT, () => console.log(`Da serv iz runnin on port ${PORT}`));