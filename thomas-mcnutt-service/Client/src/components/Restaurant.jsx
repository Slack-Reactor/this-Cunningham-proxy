import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Rating from '@material-ui/lab/Rating';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import { StyledImg } from '../componentStyles';

const Restaurant = ({ restaurant }) => (
  <Grid container spacing={1}>
    <Grid item xs={5}>
      <StyledImg variant="square" src={restaurant.imageUrl} alt="Tasty looking food" />
    </Grid>
    <Grid item xs={7}>
      {restaurant.name}
      <Rating
        style={{ color: 'rgb(52, 224, 161' }}
        name="customized-icons"
        value={restaurant.ratings.avg}
        precision={0.5}
        size="small"
        icon={<FiberManualRecordIcon />}
        getLabelText={() => `${restaurant.ratings.total} reviews`}
      />
      {`(${restaurant.ratings.total})`}
      <br />
      <DirectionsWalk />
      {restaurant.distanceFrom}
      miles
      <br />
      {restaurant.foodType}
      <br />
      <Rating
        style={{ color: 'rgb(52, 224, 161' }}
        name="customized-icons"
        value={restaurant.price}
        precision={0.5}
        size="small"
        icon={<AttachMoneyIcon />}
        getLabelText={() => `${restaurant.ratings.total} reviews`}
      />
    </Grid>
  </Grid>
);

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    ratings: PropTypes.shape({
      avg: PropTypes.number,
      total: PropTypes.number,
    }),
    imageUrl: PropTypes.string,
    distanceFrom: PropTypes.string,
    foodType: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
export default Restaurant;
