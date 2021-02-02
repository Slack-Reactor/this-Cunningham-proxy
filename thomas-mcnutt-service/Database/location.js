const mongoose = require('mongoose');
const { db } = require('./index.js');

db();

mongoose.Promise = global.Promise;

const locationSchema = new mongoose.Schema({
  Name: String,
  coords: {
    lat: { type: Number },
    long: { type: Number },
  },
  ratings: {
    avg: { type: Number },
    total: { type: Number },
  },
  address: {
    street: String,
    city: String,
    country: String,
    zip: String,
  },
  reviews: [String],
  website: String,
  phoneNum: String,
  email: String,
  _id: {
    type: String,
    default() {
      return new mongoose.Types.ObjectId();
    },
  },
});

const location = mongoose.model('location', locationSchema);

module.exports = {

  Locations: location,

  find: (req, res) => {
    location.findOne({}, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },

  create: (req, res) => {
    const obj = {
      name: req.body.name,
      coords: req.body.coords,
      ratings: req.body.ratings,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      reviews: req.body.reviews,
      website: req.body.website,
      phoneNum: req.body.phoneNum,
      email: req.body.email,
    };
    location.create(obj, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(201).send(result);
    });
  },

  update: (req, res) => {
    const id = { _id: req.params.id };
    const obj = {
      name: req.body.name,
      coords: req.body.coords,
      ratings: req.body.ratings,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      reviews: req.body.reviews,
      website: req.body.website,
      phoneNum: req.body.phoneNum,
      email: req.body.email,
    };
    location.updateOne(id, obj, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },

  delete: (req, res) => {
    const id = { _id: req.params.id };
    location.deleteOne({ _id: id }, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },
};
