import React, {useState} from 'react';
import Rules from './Rules';
import Quiz from './Quiz';

const Home = () => {
    const handleStartQuiz = () => {
        setShowQuiz(true);
      };

      const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
    {!showQuiz ? (
        <Rules onStart={handleStartQuiz} />
      ) : (
        <Quiz />
      )}
    </>
  );
};

export default Home;