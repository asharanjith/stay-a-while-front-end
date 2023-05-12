import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaTimes } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHomeStays } from '../home/HomeSlice';

export default function BookingForm({ onClose }) {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchHomeStays(token));
  }, [dispatch, token]);

  const homeStayList = useSelector((state) => state.home.listings);

  const [reservation, setReservation] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      property: selectedProperty,
      numberOfPersons,
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
    };
    onClose();
    setReservation((prevState) => ([...prevState, newReservation]));
    navigate('/reservation', { state: { reservation } });
  };

  return (
    <div className="p-2 mx-lg-auto mt-5">
      <button
        onClick={() => onClose(true)}
        type="button"
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <FaTimes />
      </button>

      <form onSubmit={handleSubmit}>

        <select
          id="property"
          className="form-control mb-3"
          value={selectedProperty}
          placeholder="property"
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          <option value="">Select a property</option>
          {homeStayList.length > 0
              && homeStayList.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
        </select>

        <input
          id="numberOfPersons"
          type="number"
          className="form-control mb-3"
          value={numberOfPersons}
          placeholder="Number of people"
          onChange={(e) => setNumberOfPersons(e.target.value)}
        />

        <DatePicker
          id="startDate"
          className="form-control mb-3"
          placeholder="start_date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
        />

        <DatePicker
          id="endDate"
          className="form-control mb-3"
          placeholder="yyyy-MM-dd"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate || new Date()}
          dateFormat="yyyy-MM-dd"
        />

        <button type="submit" className="btn btn-primary mb-3">
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}

BookingForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
