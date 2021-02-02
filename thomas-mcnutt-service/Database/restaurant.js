const mongoose = require('mongoose');
const { db } = require('./index.js');

db();

mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  name: String,
  ratings: {
    avg: { type: Number },
    total: { type: Number },
  },
  imageUrl: String,
  distanceFrom: String,
  foodType: String,
  price: Number,
  _id: {
    type: String,
    default() {
      return new mongoose.Types.ObjectId();
    },
  },
});

const restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = {

  Restaurants: restaurant,

  find: (req, res) => {
    restaurant.find({}, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },

  create: (req, res) => {
    const obj = {
      name: req.body.name,
      ratings: req.body.ratings,
      imageUrl: req.body.imageUrl,
      distanceFrom: req.body.distanceFrom,
      foodType: req.body.foodType,
      price: req.body.price,
    };
    restaurant.create(obj, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(201).send(result);
    });
  },

  update: (req, res) => {
    const id = { _id: req.params.id };
    const obj = {
      name: req.body.name,
      ratings: req.body.ratings,
      imageUrl: req.body.imageUrl,
      distanceFrom: req.body.distanceFrom,
      foodType: req.body.foodType,
      price: req.body.price,
    };
    restaurant.updateOne(id, obj, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },

  delete: (req, res) => {
    const id = { _id: req.params.id };
    restaurant.deleteOne({ _id: id }, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },

};
