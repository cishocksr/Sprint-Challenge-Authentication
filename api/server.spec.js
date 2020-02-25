const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db.seed.run;
  await db('users').truncate();
});

// test('welcome route', async () => {
//   const res = await supertest(server).get('/');
//   expect(res.status).toBe(200);
//   expect(res.type).toBe('text/html');
//   expect(res.text).toBe("<h2>Your dad isn't as funny as mine</h2>");
// });

test('register user route', async () => {
  const res = await supertest(server)
    .post('/api/auth/register')
    .send({ username: 'testUser', password: 'testPassword' });
  expect(res.status).toBe(201);
  expect(res.type).toBe('application/json');
});

describe('testing login', () => {
  test('login route', async () => {
    const regRes = await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'testUserLogin', password: 'testPassword' });
    expect(regRes.status).toBe(201);
    expect(regRes.type).toBe('application/json');
    const res = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'testUserLogin', password: 'testPassword' });
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
  });
});
