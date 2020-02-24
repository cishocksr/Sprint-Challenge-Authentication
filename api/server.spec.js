const server = require('./server.js');
const request = require('supertest');

test('/register', async () => {
  const res = await request(server)
    .post('/api/auth/register')
    .send({ username: 'testName', password: 'testPassword' });
  expect(res.status).toBe(201);
  expect(res.type).toBe('application/jspn');
});

describe('/login', () => {
  test('/login', async () => {
    const res = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'testName', password: 'testPassword' });
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
  });
});
