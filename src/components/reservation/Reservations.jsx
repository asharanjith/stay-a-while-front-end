import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation, getListReservations } from './reservationSlice';

export default function Reservation() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const reservations = useSelector((state) => state.reservation.reservations);
  useEffect(() => {
    dispatch(getListReservations(token));
  }, [dispatch, token, reservations]);

  const handleDelete = async (reservationId) => {
    console.log(reservationId); // check the value of reservationId
    await dispatch(deleteReservation(token, reservationId));
    // await console.log(dispatch(deleteReservation(reservationId, token)));
  };

  return (
    <div className="max-w-[1000px] m-auto">
      <h1 className="text-3xl mb-4 text-center">My Reservations</h1>
      {reservations && reservations.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">You have no reservations yet.</p>
          <p className="text-center text-gray-500">Go to the home page and book a home.</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-5 md:flex-nowrap md:gap-0 md:flex-col w-full mb-12">
          {
              reservations && reservations.map((reservation) => (
                <div key={reservation.id} className="flex md:flex-row md:w-full w-[310px] flex-col items-center justify-between m-auto shadow-md rounded-lg mb-4 md:m-5 md:h-[80px] px-[10px]">
                  <div className="flex flex-row flex-wrap gap-12 ml-8 mt-5 mb-4 md:flex-row md:justify-between w-full md:mx-11">
                    <div className="flex flex-col justify-center md:w-[200px]">
                      <h1 className="text-md font-bold">{reservation.reservation_id}</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-500">Start date</p>
                      <h1 className="text-md font-bold">{reservation.start_date}</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-500">End date</p>
                      <h1 className="text-md font-bold">{reservation.end_date}</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h1 className="text-md font-bold">
                        {reservation.daily_rate}
                        €
                      </h1>
                      <p className="text-sm text-gray-500">/day</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mb-[1rem]">
                    <button
                      type="button"
                      className="bg-gray-100 text-[#313131] px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            }
        </div>
      )}
    </div>
  );
}
