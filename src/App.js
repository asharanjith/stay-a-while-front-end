import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Navbarlist from './components/navbarlist/Navbarlist';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import Reservation from './components/reservation/Reservations';
import Detailed from './components/home/detailed/Detailed';
import DeleteHome from './components/delete_home/DeleteHome';
import AddHome from './components/add_home/AddHome';
import Login from './components/login/Login';
import {
  loginset,
  loginreset,
  usernamereset,
} from './components/login/loginSlicer';
import Signup from './components/signup/Signup';
import './components/home/home.css';

function App() {
  const { login, username } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginset(token));
    } else {
      dispatch(loginreset());
    }
  }, [dispatch]);
  useEffect(() => {
    if (login) {
      setTimeout(() => {
        dispatch(usernamereset());
      }, 2000);
    }
  }, [login, dispatch]);
  return (
    <div className="App">
      <Navbarlist />
      <AnimatePresence>
        {username && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="welcome-message"
          >
            Welcome
            {' '}
            {username}
            !
          </motion.div>
        )}
      </AnimatePresence>
      <Routes>
        {login && (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Detailed />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/add" element={<AddHome />} />
            <Route path="/delete" element={<DeleteHome />} />
          </>
        )}
        {login === false ? (
          <>
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <Route path="*" element={<div className="loader" />} />
        )}
      </Routes>
    </div>
  );
}
export default App;
