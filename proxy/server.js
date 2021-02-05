const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors());

// app.get('*.js', (req, res, next) => {
//   req.url += '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   console.log('sent');
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, (err) => {
  if (err) {
    console.log('error connecting to server 3000');
  } else {
    console.log('proxy server listening on port 3000')
  }
})
