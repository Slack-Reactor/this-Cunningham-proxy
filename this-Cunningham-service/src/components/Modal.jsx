import React from 'react';
import PropTypes from 'prop-types';
import css from '../styles/modal.module.css';

const Modal = ({ children }) => (
  <div className={css.modal}>
    {children}
  </div>
);

Modal.propTypes = {
  children: PropTypes.instanceOf(Object),
};

Modal.defaultProps = {
  children: {},
};

export default Modal;
