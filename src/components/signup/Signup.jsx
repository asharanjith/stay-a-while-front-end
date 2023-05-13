import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import style from './Signup.module.css';
import { signupRequest, errorReset } from './signupSlicer';

export default function Signup() {
  const [username, setUsername] = useState('');
  const { error, success, loading } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const body = {
      user: {
        name: username,
      },
    };
    dispatch(signupRequest(body));
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

  return (
    <div className={style.signupContainer}>
      {(loading && !success)
        ? (
          <>
            <div className="loader" />
            <p>Wait it can take some time...</p>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <input type="text" value={username} onKeyDown={handleKeyDown} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
            <button className="btn bg-danger text-light" type="button" onClick={handleSubmit}>Sign Up</button>
            <div className={style.login}>
              <p> Already Registered?</p>
              <Link to="/">Login Here</Link>
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
      {success && (<Navigate to="/" />)}
    </div>
  );
}
