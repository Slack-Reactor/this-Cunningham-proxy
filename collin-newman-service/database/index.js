const mongoose = require('mongoose');

const db = (database) => (
  mongoose.connect(`mongodb://localhost/${database}`, { useNewUrlParser: true }, { useUnifiedTopology: true })
);
module.exports = db;
