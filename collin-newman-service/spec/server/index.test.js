/**
 * @jest-environment node
 */
const express = require("express")
const mongoose = require("mongoose")
const createServer = require("../../server/createServer")
const supertest = require('supertest');
const Reviews = require('../../database/Reviews')
const sampleReviews = require('./sampleReviews');

describe('Server routes', () => {
  const app = createServer('test')

  beforeAll((done) => {
    app.listen(5000, () => {
      console.log("Server has started!")
    })
    mongoose.connect(
      "mongodb://localhost/test",
      { useNewUrlParser: true },
      () => done()
    )
  })

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
    console.log('STOPING SERVER');
    app.close();
  })

  it('creates a new review', async () => {
    const newReview = {
      userName: 'username',
      profilePic: 'profilepic.com',
      created_at: Date.now(),
      userHomeLocation: 'home location',
      images: ['images', 'array.com'],
      starRating: 5,
      reviewTitle: 'The cake is a lie',
      reviewBody: 'Hello world',
      dateOfExperience: Date.now(),
      helpfulVotes: 0,
      destination: 'USA BABY',
    };


    const result = await supertest(app)
        .post('/api/reviews')
        .send(newReview)
        .expect(200)
        .then(response => {
          return response;
        })
        .catch(err => console.log(err));

    expect(result.body.destination).toBe('USA BABY');
  });

  it('gets all reviews', async () => {
    Reviews.create(sampleReviews, async (err, data) => {
      await supertest(app)
        .get('/api/reviews')
        .expect(200)
        .then(response => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body).toHaveLength(101);
        })
        .catch(err => console.log(err));
    })
  });

  it('gets all reviews for a single location', async () => {
    const result1 = await supertest(app)
        .get('/api/reviews/Phitsanulok')
        .expect(200)
        .then(response => {
          return response;
        })
        .catch(err => console.log(err));

    const result2 = await supertest(app)
        .get('/api/reviews/Bangkok')
        .expect(200)
        .then(response => {
          return response;
        })
        .catch(err => console.log(err));

    const result3 = await supertest(app)
        .get('/api/reviews/Phuket')
        .expect(200)
        .then(response => {
          return response;
        })
        .catch(err => console.log(err));

    const result4 = await supertest(app)
        .get('/api/reviews/Trang')
        .expect(200)
        .then(response => {
          return response;
        })
        .catch(err => console.log(err));

    const result5 = await supertest(app)
        .get('/api/reviews/Ayutthaya')
        .expect(200)
        .then(response => {
          return response;
        })
        .catch(err => console.log(err));

    expect(Array.isArray(result1.body)).toBeTruthy();
    expect(result1.body[0].destination).toBe('Phitsanulok');
    expect(Array.isArray(result2.body)).toBeTruthy();
    expect(result2.body[0].destination).toBe('Bangkok');
    expect(Array.isArray(result3.body)).toBeTruthy();
    expect(result3.body[0].destination).toBe('Phuket');
    expect(Array.isArray(result4.body)).toBeTruthy();
    expect(result4.body[0].destination).toBe('Trang');
    expect(Array.isArray(result5.body)).toBeTruthy();
    expect(result5.body[0].destination).toBe('Ayutthaya');
  });

  it('increments the helpful votes count', async () => {
    await supertest(app)
        .patch('/api/reviews/6008ca1a8befa33fd6fe89cc')
        .expect(200)
        .then(response => {
          async () => (
            await supertest(app)
            .patch('/api/reviews/6008ca1a8befa33fd6fe89cc')
            .expect(200)
            .then(response => {
              expect(response.helpfulVotes).toBe(15)
            })
            .catch(err => console.log(err))
          );
        })
        .catch(err => console.log(err));
  });
});