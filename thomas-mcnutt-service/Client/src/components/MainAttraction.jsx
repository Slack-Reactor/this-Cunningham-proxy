import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { StyledMainImg, StyledBtn } from '../componentStyles';

const MainAttraction = ({ mainAttraction }) => (
  <div>
    <h2>Get to know the area</h2>
    <div>
      <StyledMainImg variant="square" src={mainAttraction.imageUrl} alt="A fantastic attraction" />
    </div>
    <h4>
      {mainAttraction.basicDescription}
    </h4>
    <h3>
      {mainAttraction.name}
    </h3>
    <div>
      <Rating
        style={{ color: 'rgb(52, 224, 161' }}
        name="customized-icons"
        value={mainAttraction.ratings.avg}
        precision={0.5}
        size="small"
        icon={<FiberManualRecordIcon />}
        getLabelText={() => `${mainAttraction.ratings.total} reviews`}
      />
      {`${mainAttraction.ratings.total} reviews`}
    </div>
    <p>
      {mainAttraction.description}
    </p>
    <h3>
      {`$${mainAttraction.price} per adult`}
    </h3>
    <br />
    <br />
    <StyledBtn size="small" variant="contained">
      More info
    </StyledBtn>
  </div>
);

MainAttraction.propTypes = {
  mainAttraction: PropTypes.shape({
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    ratings: PropTypes.shape({
      avg: PropTypes.number,
      total: PropTypes.number,
    }),
    distanceFrom: PropTypes.string,
    basicDescription: PropTypes.string,
  }).isRequired,
};

export default MainAttraction;
