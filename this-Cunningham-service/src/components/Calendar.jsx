/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import css from '../styles/calendar.module.css';

const TicketCounter = ({
  type, increment, decrement, count,
}) => (
  <div className={css.counter}>
    <button className={css.counterButton} onClick={decrement}>-</button>
    <div className={css.count}>{count}</div>
    <button className={css.counterButton} onClick={increment}>+</button>
    <div className={css.ticketText}>{type} Tickets</div>
  </div>
);

// plan is to pass in an array of blackout dates
const Calendar = ({ blackouts, price }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Today');

  const transformDay = (day) => {
    const date = new Date(day);
    const month = date.getMonth() + 1;
    const monthDay = date.getDate();
    setSelectedDay(`${month}/${monthDay}`);
  };

  const increment = (type) => {
    if (type === 'adult') {
      if (adultCount === 10) return;
      setAdultCount((c) => c + 1);
    } else {
      if (childCount === 10) return;
      setChildCount((c) => c + 1);
    }
  };
  const decrement = (type) => {
    if (type === 'adult') {
      if (adultCount === 0) return;
      setAdultCount((c) => c - 1);
    } else {
      if (childCount === 0) return;
      setChildCount((c) => c - 1);
    }
  };
  return (
    <div className={css['calendar-container']}>
      <style>
        {`
          .DayPicker-Day--disabled {
            color: rgba(31, 29, 29, 0.3);
          }
          .DayPicker-Day--today {
            color: black;
            background-color: #34E0A1;
          }
          .DayPicker-Day:hover {
            cursor: pointer;
            color: #34E0A1;
          }
        `}
      </style>
      <DayPicker
        disabledDays={blackouts.map((item) => new Date(item))}
        onDayMouseDown={transformDay}
      />
      <div className={css.ticketCounter}>
        <h2>Tickets for {selectedDay}</h2>
        <TicketCounter
          type="Adult"
          count={adultCount}
          increment={() => increment('adult')}
          decrement={() => decrement('adult')}
        />
        <TicketCounter
          type="Child"
          count={childCount}
          increment={() => increment('child')}
          decrement={() => decrement('child')}
        />
        <div className={css.purchaseTickets}>
          <button className={css.purchaseBtn}>Purchase</button>
          <h2>Price: ${(price * adultCount) + ((price * childCount) / 2)}</h2>
        </div>
        <p>* This Attraction is closed on grayed out days</p>
      </div>
    </div>
  );
};

export default Calendar;
