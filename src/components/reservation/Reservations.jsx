import React from 'react';
import { useLocation } from 'react-router-dom';
import ReservationItem from './ReservationItem';

export default function Reservation() {
  const { state } = useLocation();

  if (!state || !state.reservation) {
    return <div>No reservation found.</div>;
  }

  const { reservation } = state;
  console.log(state);

  return (
    <div>
      {reservation.map((reserve) => (
        <ReservationItem
          key={reserve.property}
          property={reserve.property}
          numberOfPersons={reserve.numberOfPersons}
          startDate={reserve.startDate}
          endDate={reserve.endDate}
        />
      ))}
    </div>
  );
}
