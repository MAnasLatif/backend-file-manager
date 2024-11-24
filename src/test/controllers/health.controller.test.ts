import request from 'supertest';
import app from '@/app';

describe('Health Controller', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/health')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
