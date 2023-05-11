import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteHomeId } from './deleteHomeSlice';

const DeleteCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(deleteHomeId(item.id));

  return (
    <div>
      <h3>{item.name}</h3>
      <button type="button" onClick={handleClick}>Delete</button>
    </div>
  );
};

DeleteCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteCard;
