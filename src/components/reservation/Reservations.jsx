import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation, getListReservations } from './reservationSlice';
import styles from './Reservations.module.css';
import { fetchHomeStays } from '../home/HomeSlice';

export default function Reservation() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { reservations } = useSelector((state) => state.reservation);
  const homeStayList = useSelector((state) => state.home.listings);

  useEffect(() => {
    dispatch(getListReservations(token));
    dispatch(fetchHomeStays(token));
  }, [dispatch, token]);

  const handleDelete = async (reservationId) => {
    const payload = {
      id: reservationId,
      token,
    };
    dispatch(deleteReservation(payload));
  };

  return (
    <div className="max-w-[1000px] m-auto" style={{ flex: 1 }}>
      <h1 className="text-3xl mb-4 text-center">My Reservations</h1>
      {reservations.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">You have no reservations yet.</p>
          <p className="text-center text-gray-500">Go to the home page and book a home.</p>
        </div>
      ) : (
        <div className={styles.card_container}>
          {reservations.map((reservation) => {
            const homeStay = homeStayList.find((h) => h.id === reservation.home_stay_id);
            if (!homeStay) return null;
            return (
              <div key={reservation.id}>
                <div className={styles.card}>
                  <div className={styles.card__img}>
                    <img
                      src={homeStay.images && homeStay.images.length > 0 && homeStay.images[0].url}
                      alt={homeStay.name}
                    />
                  </div>
                  <div className={styles.card__descr_wrapper}>
                    <h2 className={styles.card__title}>
                      {homeStay.name}
                    </h2>
                    <p className={styles.price}>
                      <span className={styles.total_price}>
                        $
                        {(homeStay.price
                          * (new Date(reservation.end_date).getTime()
                            - new Date(reservation.start_date).getTime())) / (1000 * 3600 * 24)}
                      </span>
                      {' '}
                      {' '}
                      |
                      <span className={styles.price_rate}>
                        $
                        {homeStay.price}
                        {' '}
                        per day
                      </span>
                    </p>
                    <p className={styles.card__descr}>
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
                      className="btn btn-danger px-4 py-2 rounded-lg"
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
