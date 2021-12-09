const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json({
    message: 'Wlcm yo'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      await res.json({
        message: 'post created dude',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  //creating a user
  const user = {
    id : 1,
    username: 'ryan',
    email: 'ryan@gmail.com',
  };

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, async (err, token) => {
    await res.json({
      token
    });
  });
});

//token formatiing


//verifying da token
function verifyToken(req, res, next) {
  //getting the auth
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    //splitting at the space
    const bearer = bearerHeader.split(' ');
    //Auth looks like this: Bearer <access_token>
    //to understand: split() splits the string above into two substrings, so you get 'Bearer' and '<access_token>', so the second string in the array is gonna be the token you want
    const bearerToken = bearer[1];
    //getting it and then we send it
    req.token = bearerToken;
    next(); //and then next middleware for some rsn
  } else {
    res.sendStatus(403);
  }
}

app.listen(PORT, () => console.log(`Da serv iz runnin on port ${PORT}`));