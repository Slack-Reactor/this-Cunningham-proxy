/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const showcase = require('./showcase');

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('*.js', (req, res, next) => {
//   req.url += '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   console.log('sent');
//   next();
// });

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/', showcase);

app.listen(port, (err) => {
  if (err) {
    console.log('Error Starting server');
  } else {
    console.log('Server Running on Port: ', port);
  }
});
