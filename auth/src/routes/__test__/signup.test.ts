import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on succesful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalid_email',
      password: 'adasdasdasda'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'vmrromero@gmail.com',
      password: 'ad'
    })
    .expect(400);
});

it('returns a 400 if no email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'vmrromero@gmail.com'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'sd'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '12345'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
})
