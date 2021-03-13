/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Overview from './Overview';
import Tickets from './Tickets';
import Images from './Images';
import useRouteListener from './hooks/routeListener';
import css from '../styles/attraction.module.css';
// const awsDNS = 'http://ec2-3-139-68-84.us-east-2.compute.amazonaws.com';
const tripLogo = 'https://fec-tripadvisor-images.s3.us-east-2.amazonaws.com/images/Tripadvisor_Logo_circle-green_horizontal-lockup_registered-small_RGB.svg';

const useForm = (initialValue) => {
  const [clickImproved, setClickImproved] = useState(false);
  const [form, setForm] = useState(initialValue);

  const handleFormChange = (e) => {
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
    setForm({
      ...form,
      [e.target.name]: newValue,
    });
  };

  const openCloseForm = (current) => {
    const {
      description, address, isOpen, suggestedDuration,
    } = current.overview;
    setClickImproved((c) => !c);
    setForm({
      ...form,
      description,
      address,
      isOpen,
      suggestedDuration,
    });
  };

  const submitImprovements = (id, e, current) => {
    e.preventDefault();
    if (JSON.stringify(form) === JSON.stringify(current.overview)) {
      console.log('Must Submit Improvements to Current Attraction Listing');
    } else {
      axios.post(`http://localhost:3001/api/showcase/${id}`, { form })
      // axios.post(`/api/showcase/${id}`, { form })
        .then(({ data }) => {
          openCloseForm(current);
          console.log(data.message);
        })
        .catch((err) => console.log('error', err));
    }
  };

  return {
    form,
    clickImproved,
    handleFormChange,
    openCloseForm,
    submitImprovements,
    setClickImproved,
  };
};
const initialFormState = {
  description: '',
  isOpen: false,
  suggestedDuration: 0,
  address: '',
};

const Attraction = () => {
  const [allAttractions, setAllAttractions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [likeHover, setLikeHover] = useState(false);
  const [browse, setBrowse] = useState(false);

  const {
    form,
    clickImproved,
    handleFormChange,
    openCloseForm,
    submitImprovements,
    setClickImproved,
  } = useForm(initialFormState);

  const { handleIdClick, handleUrlEvent } = useRouteListener({ id: 0 });

  useEffect(() => {
    // axios.get('/api/showcase')
    axios.get('http://localhost:3001/api/showcase')
      .then(({ data }) => {
        setAllAttractions(data);
        setCurrent(data[0]);
      }).catch((err) => console.log('error GETTING all', err));
  }, []);

  useEffect(() => {
    const handleShowcaseUrlEvent = () => {
      handleUrlEvent('showcase')
        .then((attraction) => setCurrent(attraction));
    };

    window.addEventListener('popstate', handleShowcaseUrlEvent);
    // clean up event listener
    return () => {
      window.removeEventListener('popstate', handleShowcaseUrlEvent);
    };
  }, []);

  useEffect(() => {
    setClickImproved();
    // make it so form closes every time current changes
  }, [current]);

  const updateHeartHover = () => setLikeHover((h) => !h);
  const updateLikeStatus = () => {
    // axios.patch(`api/showcase/like/${current._id}`, { likedStatus: !current.likedStatus })
    axios.patch(`http://localhost:3001/api/showcase/like/${current._id}`, { likedStatus: !current.likedStatus })
      .then(() => {
        setCurrent({
          ...current,
          likedStatus: !current.likedStatus,
        });
      })
      .catch((err) => {
        console.log('Error PATCH likedStatus ', err);
      });
  };

  return (
    <>
      {current ? (
        <div className={css.attraction}>
          <div className={css.trip} onClick={() => setBrowse((b) => !b)}>
            <img src={tripLogo} alt="triplogo" />
          </div>
          {browse && (
          <div className={css.buttons}>
            {allAttractions.map((attraction, i) => (
              <button key={Math.random().toString()} className={css.browseButton} type="button" onClick={() => handleIdClick(i)}>{i}</button>
            ))}
          </div>
          )}
          <Header
            current={current}
            updateHeartHover={updateHeartHover}
            updateLikeStatus={updateLikeStatus}
            likeHover={likeHover}
          />
          <Overview
            overview={current.overview}
            form={form}
            clicked={clickImproved}
            openCloseForm={() => openCloseForm(current)}
            handleFormChange={handleFormChange}
            submitImprovements={((e) => submitImprovements(current._id, e, current))}
          />
          <Tickets
            current={current}
            blackouts={current.closedDays}
          />
          <Images
            images={current.imageUrl}
            travelersChoice={current.travelersChoiceAward}
            id={current._id} /* eslint-disable-line no-underscore-dangle */
          />
        </div>
      ) : <div className={css.loading}>Loading...new1</div>}
    </>
  );
};

export default Attraction;
