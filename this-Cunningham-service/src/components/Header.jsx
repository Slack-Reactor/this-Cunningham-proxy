import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import css from '../styles/header.module.css';

const bubbles = (rating) => {
  if (typeof rating !== 'number') {
    return;
  }
  function roundHalf(num) {
    return (Math.floor(num * 2) / 2).toFixed(1);
  }
  const modifiedRating = roundHalf(rating);
  if (Number(modifiedRating) <= 5.0) {
    return `http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s${modifiedRating}-MCID-5.svg`; /* eslint-disable-line consistent-return */
  }
  return null; /* eslint-disable-line consistent-return */
};

const Header = ({
  current, updateHeartHover, likeHover, updateLikeStatus,
}) => (
  <div className={css.header}>
    <h1 className={css['header-lg']}>{current.attractionTitle}</h1>
    <div className={css['reviews-like']}>
      <div className={css['bubbles-reviews']}>
        <img className={css.bubbles} src={bubbles(current.averageRating)} alt="bubble ratings" /><p className={css.reviews}>{current.reviews} Reviews </p>
      </div>
      <div className={css.icon}>
        {current.likedStatus ? (
          <FaHeart color="red" size={20} onClick={() => updateLikeStatus(current._id)} onMouseEnter={updateHeartHover} onMouseLeave={updateHeartHover} />/* eslint-disable-line no-underscore-dangle */
        ) : <FaRegHeart color={likeHover ? 'red' : 'black'} size={20} onMouseEnter={updateHeartHover} onMouseLeave={updateHeartHover} onClick={() => updateLikeStatus(current._id)} /> /* eslint-disable-line no-underscore-dangle */}
      </div>
    </div>
    <div className={css['ranking-share']}>
      <p className={css.ranking}>
        #{current.relativeRanking[0]} of {current.relativeRanking[1]} things to do in {current.city}
      </p>
      <FiShare size={20} />
    </div>
    <p className={css.type}>{current.attractionType}</p>
  </div>
);

Header.propTypes = {
  current: PropTypes.shape({
    attractionTitle: PropTypes.string,
    reviews: PropTypes.number,
    relativeRanking: PropTypes.arrayOf(PropTypes.number),
    city: PropTypes.string,
    attractionType: PropTypes.string,
    _id: PropTypes.string,
    likedStatus: PropTypes.bool,
    averageRating: PropTypes.number,
  }).isRequired,
  updateHeartHover: PropTypes.func,
  likeHover: PropTypes.bool,
  updateLikeStatus: PropTypes.func,
};

Header.defaultProps = {
  updateHeartHover: () => {},
  updateLikeStatus: () => {},
  likeHover: false,
};
export default Header;
