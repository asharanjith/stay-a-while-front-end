import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteHomeId } from './deleteHomeSlice';
import './deleteHome.css';
import Modal from './Modal';

const DeleteCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClick = () => {
    dispatch(deleteHomeId(item.id));
    setIsModalOpen(false);
  };

  return (
    <div className="card align-self-start deleteCard" style={{ width: '18rem' }}>
      <img src={item.images.length > 0 && item.images[0].url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteClick}
        >
          Delete Home
        </button>
      </div>
      <Modal isOpen={isModalOpen} onCancel={handleCancelClick} onConfirm={handleConfirmClick} />
    </div>
  );
};

DeleteCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      }),
    ),
  }).isRequired,

};

export default DeleteCard;
