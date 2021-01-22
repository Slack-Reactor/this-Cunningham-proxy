/**
 * @jest-environment node
 */
import 'regenerator-runtime/runtime';

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const showcase = require('../server/showcase');

const app = express();

beforeAll(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/', showcase);

  await mongoose.connect('mongodb://localhost/tripAdvisor', {
    useNewUrlParser: true, useUnifiedTopology: true,
  });
});

describe('showcase Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });
  test('connecting to mongoose test', () => {
    expect(mongoose.connection.name).toBe('tripAdvisor');
  });
  test('/api/showcase GET route works', async (done) => {
    const response = await request(app).get('/api/showcase');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('json');
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].overview.description).toBeTruthy();
    expect(typeof response.body[0].overview).toEqual('object');
    expect(Array.isArray(response.body[0].relativeRanking)).toBeTruthy();
    done();
  });
  test('/api/showcase/:id GET route', async (done) => {
    const response = await request(app).get('/api/showcase');
    const id = response.body[0]._id; /* eslint-disable-line no-underscore-dangle */
    request(app).get(`/api/showcase/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.req.path).toBe(`/api/showcase/${id}`);
        expect(typeof res.body.overview.description).toEqual('string');
        expect(typeof res.body.overview).toEqual('object');
        expect(Array.isArray(res.body.relativeRanking)).toBeTruthy();
        return done();
      });
  });
  test('/api/showcase/:id GET route bad request', async () => {
    const response = await request(app).get('/api/showcase/badID');

    expect(response.status).toBe(400);
    expect('Error Getting by Id');
  });
  test('/api/showcase/like/:id PATCH route', async () => {
    const initResponse = await request(app).get('/api/showcase');
    const id = initResponse.body[0]._id; /* eslint-disable-line no-underscore-dangle */
    const response = await request(app).patch(`/api/showcase/like/${id}`)
      .send({ likedStatus: false });
    expect(response.status).toBe(200);
    expect(response.body.likedStatus).toBe(false);

    const secondResponse = await request(app).patch(`/api/showcase/like/${id}`)
      .send({ likedStatus: true });
    expect(secondResponse.body.likedStatus).toBe(true);
  });
  test('/api/showcase/like/:id PATCH should handle errors', async () => {
    await request(app).patch('/api/showcase/like/6001f45dc6cc5d2005f7d2cd')
      .send({ likedStatus: 'Breaking' })
      .expect(400)
      .expect('likedStatus must be a boolean');

    await request(app).patch('/api/showcase/like/break')
      .send({ likedStatus: true })
      .expect(400)
      .expect('Error Patching liked status');
  });
});
