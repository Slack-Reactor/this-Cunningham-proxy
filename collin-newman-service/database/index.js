const mongoose = require('mongoose');

const db = (database) => (
  // mongoose.connect(`mongodb://mongo:27017/${database}`, { useNewUrlParser: true }, { useUnifiedTopology: true })
  mongoose.connect(`mongodb://localhost/${database}`, { useNewUrlParser: true }, { useUnifiedTopology: true })
);
module.exports = db;
