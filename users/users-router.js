const express = require('express');

const router = express.Router();
const usersModel = require('./users-model');

router.get('/', async (req, res, next) => {
  try {
    const users = await usersModel.find();

    res.json(users);
  } catch (err) {
    next();
  }
});

module.exports = router;
