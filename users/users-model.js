const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 13);
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  find,
  findBy,
  add,
  findById,
  remove
};
