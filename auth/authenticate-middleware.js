/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) {
        res.status(403).json({
          message: 'You are not authorized'
        });
      } else {
        req.user = payload.user;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
