import { useState } from 'react';
import { FcCalendar } from 'react-icons/fc';
import BookingForm from './BookingForm';
import styles from './Booking.module.css';

export default function Booking() {
  const [booking, setBooking] = useState(false);

  return (
    <>
      <section className={styles.booking_section}>
        <div className="booking">
          <h1>Book A Home with Stay A While</h1>
          <hr />
        </div>

        <p className={styles.welcome_message}>
          Welcome to Stay A While, where we believe that every traveler
          deserves a home away from home.

          We pride ourselves on creating a homey feeling that sets us apart from
          other vacation rental platforms.
          Our hosts are dedicated to making your stay as comfortable and enjoyable as
          possible, and are always available to assist you with any questions or concerns.

          So why not book a stay with us and experience the comfort and warmth
          of a home away from home?
          We guarantee you won&apos;t be disappointed.
        </p>

        <span>
          <button
            type="submit"
            onClick={() => setBooking(true)}
            className={styles.booking_button}
          >
            <FcCalendar />
            {' '}
            <span>Book Now</span>
          </button>
        </span>

        {booking && (
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '600px',
            }}
          >
            <BookingForm onClose={() => setBooking(false)} />
          </div>
        </div>
        )}
      </section>
    </>
  );
}
