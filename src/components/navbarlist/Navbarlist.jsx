import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GiCrossedSabres } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import style from './Navbarlist.module.css';
import logo from '../../assets/images/logo.png';
import { loginreset } from '../login/loginSlicer';

export default function Navbarlist() {
  const { token, login } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const showmenu = () => {
    setShow(!show);
  };
  const closemenu = () => {
    setShow(false);
  };

  const logout = () => {
    dispatch(loginreset());
    closemenu();
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (login) {
      localStorage.setItem('token', token);
    }
  }, [login, token]);

  return (
    <nav className={style.navbarContainer}>
      <img src={logo} alt="Stay a While" />
      <div className={show ? `${style.navbarlink} ${style.navbarlinkmobile}` : `${style.navbarlink}`}>
        <GiCrossedSabres onClick={closemenu} className={style.closeIcon} />
        <div className={style.navbarlinklist}>
          <NavLink
            onClick={closemenu}
            className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
            to="home"
          >
            Home Stay
          </NavLink>
          <NavLink
            onClick={closemenu}
            to="booking"
            className={({ isActive }) => (isActive ? `${style.isActive}` : '')}
          >
            Booking
          </NavLink>
          <NavLink
            onClick={closemenu}
            to="reservation"
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
        {login && (<button onClick={logout} className={style.logout} type="button">Logout</button>)}
      </div>
      <div className={style.hamburger}>
        <RxHamburgerMenu onClick={showmenu} className={style.hamburgerIcon} />
      </div>
    </nav>
  );
}
