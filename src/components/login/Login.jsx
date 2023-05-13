import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import style from './Login.module.css';
import { loginRequest, errorReset } from './loginSlicer';
import { successReset } from '../signup/signupSlicer';

export default function Login() {
  const [username, setUsername] = useState('');
  const { error, login, loading } = useSelector((state) => state.login);
  const { success } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const body = {
      name: username,
    };
    dispatch(loginRequest(body));
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(errorReset());
      }, 3000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(successReset());
      }, 3000);
    }
  }, [success, dispatch]);

  return (
    <div className={style.loginContainer}>
      {success && (
        <>
          <motion.div
            initial={{ opacity: 0, x: '30vw', scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: '-30vw', scale: 0.3 }}
            transition={{
              type: 'spring', stiffness: 120,
            }}
            className={style.success}
          >
            <p>Username create successfully.</p>
          </motion.div>
        </>
      )}
      {loading
        ? (
          <>
            <div className="loader" />
            <p>Wait it can take some time...</p>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <input type="text" value={username} onKeyDown={handleKeyDown} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
            <button className="btn bg-primary text-light" type="button" onClick={handleSubmit}>Login</button>
            <div className={style.register}>
              <p> Not Registered?</p>
              <Link to="/register">Register Here</Link>
            </div>
            <AnimatePresence>
              {error
      && (
      <motion.div
        initial={{ opacity: 0, x: '30vw', scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: '-30vw', scale: 0.3 }}
        transition={{
          type: 'spring', stiffness: 120,
        }}
        className={style.alert}
      >
        <p>Alert! Invalid username</p>
      </motion.div>
      )}
            </AnimatePresence>
          </>
        )}
      {login && <Navigate to="/" />}
    </div>
  );
}
