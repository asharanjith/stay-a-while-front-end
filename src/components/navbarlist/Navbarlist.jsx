import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbarlist.module.css';
import logo from '../../assets/images/logo.png';

export default function Navbarlist() {
  return (
    <nav className={style.navbarContainer}>
      <img src={logo} alt="Stay a While" />
      <div className={style.navbarlink}>
        <NavLink
          end
          to="/"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Home Stay
        </NavLink>
        <NavLink
          end
          to="/booking"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Booking
        </NavLink>
        <NavLink
          end
          to="/reservation"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Reservation
        </NavLink>
        <NavLink
          end
          to="/add"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Add Home Stay
        </NavLink>
        <NavLink
          end
          to="/delete"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Delete Home Stay
        </NavLink>
      </div>
      <p>Footer</p>
    </nav>
  );
}
