import React from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isToggled, setToggle] = React.useState(false);
  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    exit: {
      opacity: 1, y: '100vh', color: 'red',
    },
  };

  return (
    <div className="App">
      <button type="button" onClick={() => setToggle(!isToggled)}>Toggle</button>
      <AnimatePresence>
        {isToggled && (
        <motion.h1
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          React App
        </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
