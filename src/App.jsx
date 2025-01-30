import React, { useState } from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';

const App = () => {
  const [showHome, setShowHome] = useState(false);

  const handleTransitionEnd = () => {
    if (showHome) return;
    setShowHome(true);
  };

  return (
    <>
    <div>
      {!showHome ? (
        <Landing onTransitionEnd={handleTransitionEnd} />
      ) : (
        <Home />
      )}
    </div>
    </>
  );
};

export default App;