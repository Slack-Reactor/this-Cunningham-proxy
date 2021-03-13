const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors());

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
