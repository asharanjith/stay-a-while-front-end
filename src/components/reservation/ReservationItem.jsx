import React from 'react';
import PropTypes from 'prop-types';

export default function ReservationItem({
  property, numberOfPersons, startDate, endDate,
}) {
  return (
    <div>
      <h1> Reservation</h1>
      <p>
        Property:
        {' '}
        {property}
      </p>
      <p>
        Number of persons:
        {' '}
        {numberOfPersons}
      </p>
      <p>
        Start date:
        {' '}
        {startDate}
      </p>
      <p>
        End date:
        {' '}
        {endDate}
      </p>
    </div>
  );
}

ReservationItem.propTypes = {
  property: PropTypes.string,
  numberOfPersons: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
}.isRequired;
