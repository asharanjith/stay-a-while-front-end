import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation, getListReservations } from './reservationSlice';
import './reservations.css';

export default function Reservation() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { reservations } = useSelector((state) => state.reservation);
  useEffect(() => {
    dispatch(getListReservations(token));
  }, [dispatch, token]);
  const handleDelete = async (reservationId) => {
    const payload = {
      id: reservationId,
      token,
    };
    dispatch(deleteReservation(payload));
  };

  const homeStayList = useSelector((state) => state.home.listings);

  return (
    <div className="max-w-[1000px] m-auto">
      <h1 className="text-3xl mb-4 text-center">My Reservations</h1>
      {reservations && reservations.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">You have no reservations yet.</p>
          <p className="text-center text-gray-500">Go to the home page and book a home.</p>
        </div>
      ) : (
        <div>
          {reservations && reservations.map((reservation) => {
            const homeStay = homeStayList.find((h) => h.id === reservation.home_stay_id);
            if (!homeStay) return null; // return early if home stay not found
            return (
              <div className="card-container" key={reservation.id}>
                <div className="card">
                  <div className="card__img">
                    <img
                      src={homeStay.images && homeStay.images.length > 0 && homeStay.images[0].url}
                      alt={homeStay.name}
                    />
                  </div>
                  <div className="card__descr-wrapper">
                    <p className="card__title">
                      {homeStay.name}
                    </p>
                    <p className="card__descr">
                      <br />
                      <span>
                        {reservation.start_date}
                        {' '}
                        -
                        {' '}
                        {reservation.end_date}
                      </span>
                    </p>
                    <button
                      type="button"
                      className="bg-gray-100 text-[#313131] px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

Reservation.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    home: PropTypes.shape({
      price: PropTypes.number.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
