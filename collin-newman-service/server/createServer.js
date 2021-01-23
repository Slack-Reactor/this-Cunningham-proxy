const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./reviewRoutes');
const db = require('../database/index');

function createServer(dbName) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(parser());
  app.use('/api/reviews', routes);
  db(dbName);
  return app;
}

module.exports = createServer;
