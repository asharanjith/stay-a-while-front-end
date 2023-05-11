import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Navbarlist from './components/navbarlist/Navbarlist';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import Reservation from './components/reservation/Reservation';
import Detailed from './components/home/detailed/Detailed';
import DeleteHome from './components/delete_home/DeleteHome';
import AddHome from './components/add_home/AddHome';
import Login from './components/login/Login';
import { loginset } from './components/login/loginSlicer';
import Signup from './components/signup/Signup';
import './components/home/home.css';

function App() {
  const { login } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginset(token));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Navbarlist />
      <Routes>
        {login ? (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Detailed />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/add" element={<AddHome />} />
            <Route path="/delete" element={<DeleteHome />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}
export default App;
