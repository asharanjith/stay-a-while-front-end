/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availableProperties] = useState([
    { id: 1, name: 'Property 1' },
    { id: 2, name: 'Property 2' },
    { id: 3, name: 'Property 3' },
  ]);

  const [reservation, setReservation] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      property: selectedProperty,
      numberOfPersons,
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
    };
    setReservation((prevState) => ([...prevState, newReservation]));
    // navigate('/reservation', { state: { reservation } });
    console.log(reservation)
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="property">Property:</label>
            <select
              id="property"
              className="form-control"
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              <option value="">Select a property</option>
              {availableProperties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numberOfPersons">Number of persons:</label>
            <input
              id="numberOfPersons"
              type="number"
              className="form-control"
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date:</label>
            <DatePicker
              id="startDate"
              className="form-control"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End date:</label>
            <DatePicker
              id="endDate"
              className="form-control"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate || new Date()}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Confirm Reservation
          </button>
        </form>
      </div>

    </>
  );
}
