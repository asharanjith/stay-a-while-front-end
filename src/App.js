import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbarlist from './components/navbarlist/Navbarlist';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import Reservation from './components/reservation/Reservation';
import Detailed from './components/home/detailed/Detailed';
import AddHome from './components/add_home/AddHome';
import DeleteHome from './components/delete_home/DeleteHome';

function App() {
  return (
    <div className="App">
      <Navbarlist />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed/:id" element={<Detailed />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/add" element={<AddHome />} />
        <Route path="/delete" element={<DeleteHome />} />
      </Routes>
    </div>
  );
}
export default App;
