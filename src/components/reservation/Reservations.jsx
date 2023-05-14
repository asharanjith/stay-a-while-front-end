import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { deleteReservation, getListReservations } from './reservationSlice';
import styles from './Reservations.module.css';
import { fetchHomeStays } from '../home/HomeSlice';

export default function Reservation() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { reservations } = useSelector((state) => state.reservation);
  const homeStayList = useSelector((state) => state.home.listings);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    if (reservations) {
      setTotalPages(Math.ceil(reservations.length / itemsPerPage));
    }
  }, [reservations]);

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

  const subset = reservations.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      {reservations.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-gray-500">
            You have no reservations yet.
          </h1>
          <h2 className="text-center text-gray-500">
            Go to the home page and book a home.
          </h2>
        </div>
      ) : (
        <div className={styles.card_container}>
          {subset.map((reservation) => {
            const homeStay = homeStayList.find(
              (h) => h.id === reservation.home_stay_id,
            );
            if (!homeStay) return null;
            return (
              <div key={reservation.id}>
                <div className={styles.card}>
                  <div className={styles.card__img}>
                    <img
                      src={
                        homeStay.images
                        && homeStay.images.length > 0
                        && homeStay.images[0].url
                      }
                      alt={homeStay.name}
                    />
                  </div>
                  <div className={styles.card__descr_wrapper}>
                    <h2 className={styles.card__title}>{homeStay.name}</h2>
                    <p className={styles.price}>
                      <span className={styles.total_price}>
                        $
                        {(homeStay.price
                          * (new Date(reservation.end_date).getTime()
                            - new Date(reservation.start_date).getTime()))
                          / (1000 * 3600 * 24)}
                      </span>
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
      <ReactPaginate
        itemClass="pageitem"
        linkClass="pagelink"
        previousLabel="Prev"
        nextLabel="Next"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="pagination justify-content-center"
        pageClassName="pageitem"
        pageLinkClassName="pagelink"
        activeClassName="active"
        previousClassName="pageitem"
        previousLinkClassName="pagelink"
        nextClassName="pageitem"
        nextLinkClassName="pagelink"
      />
    </div>
  );
}
