import app from '../server';
import supertest from 'supertest';

describe('GET /', () => {
  it('should return valid JSON with a message property', async () => {
    const response = await supertest(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('JSON');
  });
});
