import React from 'react';
import PropTypes from 'prop-types';
import { TiPencil } from 'react-icons/ti';
import Modal from './Modal';
import css from '../styles/improveListing.module.css';

const ImproveListing = ({
  clicked, form, handleFormChange, openCloseForm, submitImprovements, id,
}) => (
  <div className={css.improveListing}>
    {clicked ? (
      <Modal>
        <form className={css.improve} onSubmit={(e) => submitImprovements(id, e)}>
          <div className={css['form-flex']}>
            <h2 className={css.formHeader}>Suggest Edits</h2>
            Description<br />
            <input id="description" name="description" placeholder="description" type="text" value={form.description} onChange={handleFormChange} /><br />
            <label htmlFor="duration">
              Suggested Duration<br />
              <input type="number" id="duration" name="suggestedDuration" min="1" max="240" value={form.suggestedDuration} onChange={handleFormChange} />
              {form.suggestedDuration > 24 ? ` (${(form.suggestedDuration / 24).toFixed(1)} days)` : ' hours' }
            </label><br />
            <label htmlFor="openClosed">
              <input name="isOpen" type="radio" onChange={handleFormChange} value id="open" />  Open    <input name="isOpen" type="radio" onChange={handleFormChange} value="false" id="closed" />  Closed
            </label><br />
            Address<br />
            <input name="address" type="text" onChange={handleFormChange} value={form.address} />
            <br />
            <div className={css.btnFlex}>
              <button type="submit">Submit</button>
              <button type="button" onClick={openCloseForm}>Close</button>
            </div>
          </div>
        </form>
      </Modal>
    ) : <div className={css.pencilForm}><TiPencil className={css.pencil} size={23} /><button type="button" className={css.openFormBtn} onClick={openCloseForm}>Improve This Listing</button></div>}
  </div>
);

ImproveListing.propTypes = {
  clicked: PropTypes.bool,
  form: PropTypes.shape({
    description: PropTypes.string,
    isOpen: PropTypes.bool,
    suggestedDuration: PropTypes.number,
    address: PropTypes.string,
  }),
  handleFormChange: PropTypes.func,
  openCloseForm: PropTypes.func,
  submitImprovements: PropTypes.func,
  id: PropTypes.string,
};

ImproveListing.defaultProps = {
  clicked: false,
  form: {
    description: '',
  },
  handleFormChange: () => {},
  openCloseForm: () => {},
  submitImprovements: () => {},
  id: 'Invalid',
};

export default ImproveListing;
