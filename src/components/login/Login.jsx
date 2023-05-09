import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import style from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleSubmit = async () => {
    const body = {
      name: username,
    };
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
    } else {
      setAlert(true);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  return (
    <div className={style.loginContainer}>
      <h1>Login</h1>
      <input type="text" value={username} onKeyDown={handleKeyDown} onChange={(e) => setUsername(e.target.value)} />
      <button type="button" onClick={handleSubmit}>Login</button>
      {loggedIn && <Navigate to="/" />}
      <AnimatePresence>
        {alert
      && (
      <motion.div
        initial={{ opacity: 0, x: '30vw', scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: '-50vw', scale: 0.3 }}
        transition={{
          type: 'spring', stiffness: 120,
        }}
        className={style.alert}
      >
        <p>Alert! Invalid username</p>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
