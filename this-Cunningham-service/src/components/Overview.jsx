/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { CgSandClock } from 'react-icons/cg';
import ImproveListing from './ImproveListing';
import css from '../styles/overview.module.css';

const Overview = ({
  overview, form, handleFormChange, clicked, openCloseForm, submitImprovements,
}) => (
  <div className={css.overview}>
    <h4 className={css['overview-header']}>Overview</h4>
    <p className={css.description}>{overview.description}</p>
    <div className={css.clock}>
      <FaRegClock size={20} /><p className={css['open-closed']}><strong>{overview.isOpen ? 'Open Now' : 'Closed'}:</strong> {overview.hours.open > 12 ? `${overview.hours.open - 12}pm` : `${overview.hours.open}am`} - {overview.hours.close}pm </p>
    </div>
    <div className={css.time}>
      <CgSandClock className={css.timeIcon} size={25} />
      <p className={css.duration}>
        <strong>Suggested Duration: </strong>{overview.suggestedDuration > 60 ? `${(overview.suggestedDuration / 60).toFixed(1)} hours` : `${overview.suggestedDuration} minutes`}
      </p>
    </div>
    <div className={css.addressWithIcon}>
      <FiMapPin className={css.addressIcon} size={25} />
      <div className={css['address-container']}>
        <div className={css.address}><strong>Address:</strong></div>
        <p className={css.address}>{overview.address}</p>
      </div>
    </div>
    <ImproveListing
      form={form}
      handleFormChange={handleFormChange}
      clicked={clicked}
      openCloseForm={openCloseForm}
      submitImprovements={submitImprovements}
    />
  </div>
);

Overview.propTypes = {
  overview: PropTypes.shape({
    description: PropTypes.string,
    isOpen: PropTypes.bool,
    suggestedDuration: PropTypes.number,
    address: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    description: PropTypes.string,
    isOpen: PropTypes.bool,
    suggestedDuration: PropTypes.number,
    address: PropTypes.string,
  }),
  handleFormChange: PropTypes.func,
  clicked: PropTypes.bool,
  openCloseForm: PropTypes.func,
  submitImprovements: PropTypes.func,
};

Overview.defaultProps = {
  form: {
    description: '',
  },
  handleFormChange: () => {},
  openCloseForm: () => {},
  submitImprovements: () => {},
  clicked: false,
};

export default Overview;
