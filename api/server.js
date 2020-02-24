const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
  res.send(200).json({
    message: 'Houston... we have ignition!!'
  });
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Houston... we have a problem'
  });
});

module.exports = server;
