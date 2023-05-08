import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import AddHome from './components/add_home/AddHome';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/addHome" element={<AddHome />} />
      </Routes>
    </div>
  );
}

export default App;
