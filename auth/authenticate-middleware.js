const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'You are not authorized'
        });
      } else {
        // req.user = payload.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
