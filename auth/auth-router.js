const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sercrets = require('../config/secrets');
const userModel = require('../users/users-model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  userModel
    .add(user)
    .then(saved => {
      res.status(201).json({ created_user: saved });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', async (req, res, next) => {
  try {
    let { username, password } = req.body;

    const user = await userModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compareSync(password, user.password);

    if (user && passwordValid) {
      const token = genToken(user);

      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: token
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    next(err);
  }
});

function genToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };
  const token = jwt.sign(payload, sercrets.jwtSecret, options);

  return token;
}

module.exports = router;
