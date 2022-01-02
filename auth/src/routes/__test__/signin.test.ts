import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'vmrromero@gmail.com',
      password: '12345'
    })
    .expect(400);
})

it('fails when an incorrect password is supplied', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'vmrromero@gmail.com',
      password: '12345'
    })
    .expect(201);
  
  expect(response.get('Set-Cookie')).toBeDefined();
  
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'vmrromero@gmail.com',
      password: '123456'
    })
    .expect(400);
})

it('responds with a cookie after signed in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'vmrromero@gmail.com',
      password: '12345'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'vmrromero@gmail.com',
      password: '12345'
    })
    .expect(201);
  
  expect(response.get('Set-Cookie')).toBeDefined();

})