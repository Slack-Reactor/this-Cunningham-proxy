import React from 'react';
import PropTypes from 'prop-types';
import css from '../styles/images.module.css';

export default class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attractionImages: [],
      displayedImage: '',
      index: 0,
      showAwardToolTip: false,
    };
    this.changeImage = this.changeImage.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  componentDidMount() {
    const { images } = this.props;
    const sliced = images.slice();
    this.setState({
      attractionImages: sliced,
      displayedImage: sliced[0],
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { index } = this.state;
      const { images, id } = this.props;
      const sliced = images.slice();

      if (id !== prevProps.id) {
        this.setState({
          index: 0,
          displayedImage: sliced[0],
        });
      }
      this.setState({
        attractionImages: sliced,
        displayedImage: sliced[index],
      });
    }
  }

  changeImage(direction) {
    const { index, attractionImages } = this.state;
    if (direction === 'next') {
      if (attractionImages[index + 1] === undefined) {
        return;
      }
      this.setState({
        displayedImage: attractionImages[index + 1],
        index: index + 1,
      });
    }
    if (direction === 'prev') {
      if (attractionImages[index - 1] === undefined) {
        return;
      }
      this.setState({
        displayedImage: attractionImages[index - 1],
        index: index - 1,
      });
    }
  }

  toggleTooltip() {
    const { showAwardToolTip } = this.state;
    this.setState({
      showAwardToolTip: !showAwardToolTip,
    });
  }

  render() {
    const { travelersChoice, images } = this.props;
    const { displayedImage, showAwardToolTip } = this.state;
    return (
      <div className={css.images}>
        {travelersChoice && (
          <img className={css.award} src="http://www.tripadvisor.com/img/cdsi/img2/awards/TC_2019_downloadable_L_R-40840-5.jpg" alt="Trip advisor award logo" onMouseEnter={this.toggleTooltip} onMouseLeave={this.toggleTooltip} />
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
            <button type="button" className={css.next} onClick={() => this.changeImage('next')}>{'>'}</button>
            <button type="button" className={css.prev} onClick={() => this.changeImage('prev')}>{'<'}</button>
          </div>
        ) : null}
        <img src={displayedImage} alt="" className={css.image} />
      </div>
    );
  }
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  travelersChoice: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
