import React from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';

// import Key from '../../../googleApiKey';

const Map = ({ coords }) => (
  <div className="google-map">
    <GoogleMap
      // bootstrapURLKeys={{ key: Key }}
      center={[coords.lat, coords.long]}
      zoom={9}
    />
  </div>
);

Map.propTypes = {
  coords: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
  }).isRequired,
};

export default Map;
