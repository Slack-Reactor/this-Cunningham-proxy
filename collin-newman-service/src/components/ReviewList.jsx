import React from 'react';
import Proptypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Pagination from './Pagination';
import ReviewCard from './ReviewCard';

const noReviewsCard = () => (
  <Card>
    <CardHeader
      title={(
        <Typography variant="subtitle1" color="textPrimary" component="div">
          No results found.
        </Typography>
      )}
      subheader={(
        <Typography display="inline" variant="caption" color="textSecondary" component="p">
          Try removing a filter, changing your search, or clear all to read reviews.
        </Typography>
      )}
    />
  </Card>
);

const ReviewList = ({ reviewsToRender, helpfulClickHandler, pages }) => {
  let reviewList = noReviewsCard();
  let pagination = null;

  if (reviewsToRender.length > 0) {
    reviewList = reviewsToRender.map((review) => {
      const { _id } = review;
      return (
        <>
          <ReviewCard
            review={review}
            helpfulClickHandler={helpfulClickHandler}
            key={String(_id)}
          />
          <Divider />
        </>
      );
    });
    if (pages > 1) {
      pagination = <Pagination />;
    }
  }

  return (
    <div>
      {reviewList}
      {pagination}
    </div>
  );
};

ReviewList.propTypes = {
  reviewsToRender: Proptypes.arrayOf(Proptypes.shape({
    created_at: Proptypes.string,
    dateOfExperience: Proptypes.string,
    destination: Proptypes.string,
    helpfulVotes: Proptypes.number,
    images: Proptypes.arrayOf(Proptypes.string),
    profilePic: Proptypes.string,
    reviewBody: Proptypes.string,
    reviewTitle: Proptypes.string,
    starRating: Proptypes.number,
    userHomeLocation: Proptypes.string,
    userName: Proptypes.string,
    _id: Proptypes.string,
  })).isRequired,
  helpfulClickHandler: Proptypes.func.isRequired,
  pages: Proptypes.number.isRequired,
};

export default ReviewList;
