import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GiCrossedSabres } from 'react-icons/gi';
import style from './Navbarlist.module.css';
import logo from '../../assets/images/logo.png';

export default function Navbarlist() {
  const [show, setShow] = React.useState(false);
  const showmenu = () => {
    setShow(!show);
  };
  const closemenu = () => {
    setShow(false);
  };
  return (
    <nav className={style.navbarContainer}>
      <img src={logo} alt="Stay a While" />
      <div className={show ? `${style.navbarlink} ${style.navbarlinkmobile}` : `${style.navbarlink}`}>
        <GiCrossedSabres onClick={closemenu} className={style.closeIcon} />
        <NavLink
          onClick={closemenu}
          end
          to="/"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Home Stay
        </NavLink>
        <NavLink
          onClick={closemenu}
          end
          to="/booking"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Booking
        </NavLink>
        <NavLink
          onClick={closemenu}
          end
          to="/reservation"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Reservation
        </NavLink>
        <NavLink
          onClick={closemenu}
          end
          to="/add"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Add Home Stay
        </NavLink>
        <NavLink
          onClick={closemenu}
          end
          to="/delete"
          className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
        >
          Delete Home Stay
        </NavLink>
      </div>
      <div className={style.hamburger}>
        <RxHamburgerMenu onClick={showmenu} className={style.hamburgerIcon} />
      </div>
      <p>Footer</p>
    </nav>
  );
}
