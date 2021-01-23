const request = require('supertest');

// request = request('http://localhost:3000');
const server = require('../../Server/index.js');
// const { db, dbDisc } = require('../../Database/index.js');

describe('Turning Server on for tests', () => {
  // beforeAll(() => {
  //   db();
  // });

  // afterAll(() => {
  //   dbDisc();
  // });

  describe('Testing Location Routes', () => {
    // Location route tests

    const locationExample = {
      coords: {
        lat: 51.455,
        long: -2.596,
      },
      ratings: {
        avg: 1,
        total: 227,
      },
      address: {
        street: 'Emmy Summit',
        city: 'Bristol',
        country: 'England',
        zip: '44637',
      },
      reviews: [
        'Neque rerum praesentium. Qui sit ducimus nulla accusantium magni voluptatibus harum provident est. Quaerat et facere cumque vitae animi adipisci aut. Id quia voluptatum nihil quia accusantium perspiciatis ex. Earum enim molestiae eligendi quidem numquam hic vel sed amet. Incidunt tempore quod vero tempore.',
        'Quis non aut et quam in architecto qui placeat. Harum exercitationem consequatur voluptas voluptate rem. Quo nihil voluptate occaecati officiis suscipit consectetur voluptate dolores. Dolorem suscipit dolore facere.',
        'Inventore suscipit veritatis ipsa autem illo. Sunt corrupti et aliquid. Nisi dolorum omnis eaque nisi ullam. Velit quo consequatur qui saepe. Corporis libero sapiente eos et doloribus laboriosam iusto beatae quibusdam. Deleniti est laborum.',
      ],
      Name: 'Bristol',
      website: 'www.Bristol.gov',
      phoneNum: '211.205.9777 x313',
      email: 'Bristol@gmail.com',
      __v: 0,
      _id: 5555,
    };

    test('Location should send a 200 response code for the get method', (done) => request(server)
      .get('/api/location')
      .expect(200, done));

    test('Location should send a 201 response code for the create method', (done) => request(server)
      .post('/api/location')
      .set('Content-type', 'application/json')
      .send({ locationExample })
      .expect(201, done));

    test('Location should send a 201 response code for the put method', (done) => request(server)
      // eslint-disable-next-line no-underscore-dangle
      .put('/api/location5555')
      .send({ locationExample })
      .expect(200, done));

    test('Location should send a 200 response code for the delete method', (done) => request(server)
      .delete('/api/location5555')
      .expect(200, done));
  });

  describe('Testing Attraction Routes', () => {
    // Attraction route tests
    const attractionExample = {
      _id: 6666,
      ratings: {
        avg: 2,
        total: 622,
      },
      name: 'Abshire - Weimann',
      imageUrl: 'http://placeimg.com/640/480/city?random=548',
      description: 'Voluptate assumenda asperiores laudantium commodi consequatur occaecati. Officia dicta suscipit nisi. Sapiente magni ad quisquam necessitatibus quia reprehenderit accusantium. Ad dolorum doloribus.',
      price: 77,
      distanceFrom: '0.6',
      basicDescription: 'Rock Massages',
      __v: 0,
    };

    test('Attraction should send a 200 response code for the get method', (done) => request(server)
      .get('/api/attraction')
      .expect(200, done));

    test('Attraction should send a 201 response code for the create method', (done) => request(server)
      .post('/api/attraction')
      .set('Content-type', 'application/json')
      .send({ attractionExample })
      .expect(201, done));

    test('Attraction should send a 201 response code for the put method', (done) => request(server)
      // eslint-disable-next-line no-underscore-dangle
      .put('/api/attraction6666')
      .send({ attractionExample })
      .expect(200, done));

    test('Attraction should send a 200 response code for the delete method', (done) => request(server)
      .delete('/api/attraction6666')
      .expect(200, done));
  });

  describe('Testing Restaurant Routes', () => {
    // Restaurant route tests

    const restaurantExample = {
      name: 'Fake Bagels',
      ratings: {
        avg: 5,
        total: 773,
      },
      imageUrl: 'http://placeimg.com/640/480',
      _id: 7777,
    };

    test('Restaurant should send a 200 response code for the get method', (done) => request(server)
      .get('/api/restaurant')
      .expect(200, done));

    test('Restaurant should send a 201 response code for the create method', (done) => request(server)
      .post('/api/restaurant')
      .set('Content-type', 'application/json')
      .send({ restaurantExample })
      .expect(201, done));

    test('Restaurant should send a 201 response code for the put method', (done) => request(server)
      // eslint-disable-next-line no-underscore-dangle
      .put('/api/restaurant7777')
      .send({ restaurantExample })
      .expect(200, done));

    test('Restaurant should send a 200 response code for the delete method', (done) => request(server)
      .delete('/api/restaurant7777')
      .expect(200, done));
  });
});
