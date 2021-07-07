import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../styles/images.module.css';

const Images = ({ images, id, travelersChoice }) => {
  const [attractionImages, setAttractionImages] = useState([]);
  const [displayedImage, setDisplayedImage] = useState('');
  const [index, setIndex] = useState(0);
  const [showAwardToolTip, setShowAwardToolTip] = useState(false);

  useEffect(() => {
    const sliced = images.slice();
    setAttractionImages(sliced);
    setDisplayedImage(sliced[0]);
  }, []);

  useEffect(() => {
    const sliced = images.slice();
    setIndex(0);
    setDisplayedImage(sliced[0]);
  }, [id]);

  useEffect(() => {
    const sliced = images.slice();
    setAttractionImages(sliced);
    setDisplayedImage(sliced[index]);
  }, [index]);

  const changeImage = (direction) => {
    if (direction === 'next') {
      if (attractionImages[index + 1] === undefined) {
        return;
      }
      setDisplayedImage(attractionImages[index + 1]);
      setIndex((i) => i + 1);
    }
    if (direction === 'prev') {
      if (attractionImages[index - 1] === undefined) {
        return;
      }
      setDisplayedImage(attractionImages[index - 1]);
      setIndex((i) => i - 1);
    }
  };

  const toggleTooltip = () => {
    setShowAwardToolTip((t) => !t);
  };

  return (
    <div className={css.images}>
      {travelersChoice && (
        <img className={css.award} src="http://www.tripadvisor.com/img/cdsi/img2/awards/TC_2019_downloadable_L_R-40840-5.jpg" alt="Trip advisor award logo" onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip} />
      )}
      {showAwardToolTip && (
        <div className={css.tooltip}>
          <h3>What is Travelers’ Choice?</h3>
          <p>
            Tripadvisor gives a Travelers’ Choice award to accommodations, attractions and
            restaurants that consistently earn great reviews from travelers and are ranked
            within the top 10% of properties on Tripadvisor.
          </p>
        </div>
      )}
      {images.length > 1 ? (
        <div className={css.overlay}>
          <button type="button" className={css.next} onClick={() => changeImage('next')}>{'>'}</button>
          <button type="button" className={css.prev} onClick={() => changeImage('prev')}>{'<'}</button>
        </div>
      ) : null}
      <img src={displayedImage} alt="" className={css.image} />
    </div>
  );
};

export default Images;

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  travelersChoice: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
