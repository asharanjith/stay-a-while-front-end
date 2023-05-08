import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbarlist from './components/navbarlist/Navbarlist';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import Reservation from './components/reservation/Reservation';
import Detailed from './components/home/detailed/Detailed';
import AddHotel from './components/add_hotel/AddHotel';
import DeleteHotel from './components/delete_hotel/DeleteHotel';

function App() {
  return (
    <div className="App">
      <Navbarlist />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed/:id" element={<Detailed />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/add" element={<AddHotel />} />
        <Route path="/delete" element={<DeleteHotel />} />
      </Routes>
    </div>
  );
}
export default App;
