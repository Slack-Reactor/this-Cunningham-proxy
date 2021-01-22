import React from 'react';
import PropTypes from 'prop-types';
import { GrTicket } from 'react-icons/gr';
import css from '../styles/tickets.module.css';

const Tickets = ({ current }) => (
  <div className={css.tickets}>
    <div className={css.ticketContainer}>
      <div className={css.ticketTitle}>
        <div className={css.withIcon}>
          <GrTicket className={css.ticketIcon} size={25} />
          <h3 className={css['ticket-header']}>
            {current.attractionTitle} Entrance Tickets
          </h3>
        </div>
        <div className={css.price}>
          <div>
            <span className={css['ticket-price']}>from </span>
          </div>
          <strong>${current.ticketPrice}</strong>
        </div>
      </div>
      <button className={css['get-tix-btn']} type="button">Check Availability</button>
    </div>
  </div>
);

Tickets.propTypes = {
  current: PropTypes.shape({
    attractionTitle: PropTypes.string,
    ticketPrice: PropTypes.number,
  }),
};

Tickets.defaultProps = {
  current: {
    attractionTitle: 'There are no',
    ticketPrice: 0,
  },
};
export default Tickets;
