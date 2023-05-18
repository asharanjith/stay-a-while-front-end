import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onCancel, onConfirm }) => (
  <>
    {isOpen && (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Are you sure?</h5>
          <button type="button" className="btn-close" onClick={onCancel}>{ }</button>
        </div>
        <div className="modal-body">
          <p>Do you really want to delete these records? This process cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>

        </div>
      </div>

    </div>
    )}

  </>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
