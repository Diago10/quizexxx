// Landing.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = ({ onTransitionEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000); // Wait for 3 seconds before fading out

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const transitionTimer = setTimeout(() => {
        onTransitionEnd(); // Notify parent component when transition ends
      }, 1000); // Matches the duration of the fade-out animation

      return () => clearTimeout(transitionTimer);
    }
  }, [fadeOut, onTransitionEnd]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundImage: "url('https://wallpapercave.com/wp/wp2694479.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0, scale: 0.9 }} // Start animation
          animate={{ opacity: 1, scale: 1 }} // During animation
          exit={{ opacity: 0, scale: 1.1 }} // Exit animation
          transition={{ duration: 1 }} // Duration for all animations
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-mono font-extrabold justify-center text-white text-2xl md:text-6xl lg:text-6xl">
              Welcome to Quizexxx
            </h1>
            <p className="font-mono justify-center text-white mt-4 font-bold">
              We are glad to have you here!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Landing;
