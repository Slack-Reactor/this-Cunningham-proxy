const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars

const reviewSchema = new mongoose.Schema({
  userName: String,
  profilePic: String,
  created_at: { type: Date, default: Date.now },
  userHomeLocation: String,
  images: [String],
  starRating: Number,
  reviewTitle: String,
  reviewBody: String,
  dateOfExperience: Date,
  helpfulVotes: Number,
  destination: String,
  language: String,
  travelerType: [String],
});

const Reviews = mongoose.model('Review', reviewSchema);

const findAll = (cb) => {
  Reviews.find({}, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const create = (review, cb) => {
  Reviews.create(review, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const incHelpfulCounter = (reviewId, cb) => {
  const id = { _id: reviewId };
  const update = { $inc: { helpfulVotes: 1 } };

  Reviews.findByIdAndUpdate(id, update, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const findByDestination = (destination, cb) => {
  const review = { destination };
  Reviews.find(review, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const remove = (cb) => {
  Reviews.remove({}, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = {
  findAll,
  create,
  incHelpfulCounter,
  findByDestination,
  remove,
  ReviewsModel: Reviews,
};
