import request from 'supertest';
import {app, closeServer} from '../src/app';

afterAll(async () => {
  closeServer();
});

describe('Sample Controller', () => {
  it('should return sample data', async () => {
    const response = await request(app).get('/sample');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, this is a sample API response!' });
  });
});
