import React from 'react';
import axios from 'axios';
import Header from './Header';
import Overview from './Overview';
import Tickets from './Tickets';
import Images from './Images';
import css from '../styles/attraction.module.css';

const tripLogo = 'https://thumbs.bfldr.com/at/q7vbfh-g63bz4-7oss5e/v/12877929?expiry=1611963494&fit=bounds&height=800&sig=OTQ1YTViN2QyNTMyN2Y4N2YzMWJmMmQxMzQ0NDliOWI0NGVhZDFjNQ%3D%3D&width=1100';

export default class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allAttractions: [],
      current: null,
      likeHover: false,
      form: {
        description: '',
        isOpen: false,
        suggestedDuration: 0,
        address: '',
      },
      clickImproved: false,
      browse: false,
    };
    this.updateHeartHover = this.updateHeartHover.bind(this);
    this.buttonBrowser = this.buttonBrowser.bind(this);
    this.updateLikeStatus = this.updateLikeStatus.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitImprovements = this.submitImprovements.bind(this);
    this.openCloseForm = this.openCloseForm.bind(this);
  }

  componentDidMount() {
    const { current } = this.state;
    axios.get('http://localhost:3001/api/showcase')
      .then(({ data }) => {
        this.setState({
          allAttractions: data,
          current: current || data[0],
        });
      }).catch((err) => console.log('error GETTING all', err));
  }

  handleFormChange(e) {
    const { form } = this.state;
    // must copy new value, cannot modify e.target.value directly
    let newValue = e.target.value;
    if (e.target.name === 'suggestedDuration') {
      newValue = Number(newValue);
    }
    if (newValue === 'true') {
      newValue = true;
    }
    if (newValue === 'false') {
      newValue = false;
    }
    this.setState({
      form: {
        ...form,
        [e.target.name]: newValue,
      },
    });
  }

  buttonBrowser(attraction) {
    this.setState({
      current: attraction,
    });
  }

  openCloseForm() {
    const { clickImproved, form, current } = this.state;
    const {
      description, address, isOpen, suggestedDuration,
    } = current.overview;

    this.setState({
      clickImproved: !clickImproved,
      form: {
        ...form,
        description,
        address,
        isOpen,
        suggestedDuration,
      },
    });
  }

  submitImprovements(id, e) {
    e.preventDefault();
    const { form, current } = this.state;
    if (JSON.stringify(form) === JSON.stringify(current.overview)) {
      console.log('Must Submit Improvements to Current Attraction Listing');
    } else {
      axios.post(`http://localhost:3001/api/showcase/${id}`, { form })
        .then(({ data }) => {
          this.openCloseForm();
          console.log(data.message);
        })
        .catch((err) => console.log('error', err));
    }
  }

  updateHeartHover() {
    const { likeHover } = this.state;
    this.setState({
      likeHover: !likeHover,
    });
  }

  updateLikeStatus(id) {
    const { current } = this.state;
    this.setState({
      current: {
        ...current,
        likedStatus: !current.likedStatus,
      },
    }, () => {
      axios.patch(`http://localhost:3001/api/showcase/like/${id}`, { likedStatus: !current.likedStatus })
        .catch((err) => {
          console.log('Error PATCH likedStatus ', err);
        });
    });
  }

  render() {
    const {
      current, likeHover, form, clickImproved, allAttractions, browse,
    } = this.state;
    return (
      <>
        {current ? (
          <div className={css.attraction}>
            <div className={css.trip} onClick={() => this.setState({ browse: !browse })}>
              <img src={tripLogo} alt="triplogo" />
            </div>
            {browse && (
            <div className={css.buttons}>
              {allAttractions.map((attraction, i) => (
                <button key={Math.random().toString()} className={css.browseButton} type="button" onClick={() => this.buttonBrowser(attraction)}>{i}</button>
              ))}
            </div>
            )}
            <Header
              current={current}
              updateHeartHover={this.updateHeartHover}
              updateLikeStatus={this.updateLikeStatus}
              likeHover={likeHover}
            />
            <Overview
              overview={current.overview}
              form={form}
              clicked={clickImproved}
              openCloseForm={this.openCloseForm}
              handleFormChange={this.handleFormChange}
              submitImprovements={this.submitImprovements}
              id={current._id} /* eslint-disable-line no-underscore-dangle */
            />
            <Tickets current={current} />
            <Images
              images={current.imageUrl}
              travelersChoice={current.travelersChoiceAward}
              id={current._id} /* eslint-disable-line no-underscore-dangle */
            />
          </div>
        ) : <div className={css.loading}>Loading...</div>}
      </>
    );
  }
}
