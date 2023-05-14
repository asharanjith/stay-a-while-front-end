import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaTimes } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { loginreset } from '../login/loginSlicer';

export default function BookingForm({ onClose }) {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
  );
  const dispatch = useDispatch();
  const [idv, setIdv] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIdv(true);
      setSelectedProperty(id);
    }
  }, [id]);

  useEffect(() => {
    setEndDate(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
  }, [startDate]);

  const homeStayList = useSelector((state) => state.home.listings);
  const apiCall = async (reservation, token) => {
    const requestContent = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        'http://localhost:3000/reservations',
        reservation,
        requestContent,
      );
      if (response.status === 201) {
        navigate('/reservation');
      } else if (response.status === 500) {
        throw new Error('Something went wrong');
      }
      onClose();
    } catch (error) {
      dispatch(loginreset());
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      reservation: {
        no_of_persons: numberOfPersons,
        start_date: startDate.toDateString(),
        end_date: endDate.toDateString(),
        home_stay_id: selectedProperty,
      },
    };
    const token = localStorage.getItem('token');
    apiCall(newReservation, token);
  };
  return (
    <div className="p-2 mx-lg-auto mt-5">
      <button
        onClick={() => onClose(true)}
        type="button"
        className="btn"
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
          disabled={idv}
          required
        >
          <option value="" disabled>
            Select a property
          </option>
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
          required
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
          minDate={endDate}
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
