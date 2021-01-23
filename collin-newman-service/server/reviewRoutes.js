const express = require('express');
const cors = require('cors');
const Reviews = require('../database/Reviews.js');

const app = express();

app.use(cors());

const router = express.Router();

router.get('/', (req, res) => {
  Reviews.findAll((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/:location', (req, res) => {
  Reviews.findByDestination(req.params.location, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  const newReview = {
    userName: req.body.userName,
    profilePic: req.body.profilePic,
    created_at: Date.now(),
    userHomeLocation: req.body.userHomeLocation,
    images: req.body.images,
    starRating: req.body.starRating,
    reviewTitle: req.body.reviewTitle,
    reviewBody: req.body.reviewBody,
    dateOfExperience: req.body.dateOfExperience,
    helpfulVotes: 0,
    destination: req.body.destination,
  };
  Reviews.create(newReview, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.patch('/:id', (req, res) => {
  Reviews.incHelpfulCounter(req.params.id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
