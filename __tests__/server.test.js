const request = require('supertest');
const server = require('../server');

describe('server routes', () => {
  let app;

  beforeAll(() => {
    app = server.app;
  });

  it('should respond with 404 for a bad route', async () => {
    const response = await request(app).get('/bad-route');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found');
  });

  it('should respond with 404 for a bad method', async () => {
    const response = await request(app).post('/person');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found');
  });

  it('should respond with 500 if name is missing in the query string', async () => {
    const response = await request(app).get('/person');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Name is missing');
  });

  it('should respond with 200 and return the name in the query string', async () => {
    const name = 'John';
    const response = await request(app).get(`/person?name=${name}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name });
  });
});