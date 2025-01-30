import React, { useEffect, useState } from 'react';
import { fetchQuizData } from '../api/api';
import { motion } from 'framer-motion';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // Tracks feedback for the current answer
  const [showAnimation, setShowAnimation] = useState(false); // Controls animation visibility
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuizData = async () => {
      const data = await fetchQuizData();
      setQuizData(data);
    };
    getQuizData();
  }, []);

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption.is_correct;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Store user's answer and provide feedback
    setUserAnswers([...userAnswers, selectedOption]);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setShowAnimation(true);

    // Delay for feedback and move to the next question or complete quiz
    setTimeout(() => {
      setShowAnimation(false);
      setFeedback(null);

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 2000); // 2-second delay
  };

  const getFinalMessage = () => {
    if (score <= 3) {
      return { message: 'You need to work harder', emoji: '😓' };
    } else if (score <= 7) {
      return { message: 'Satisfactory', emoji: '🙂' };
    } else {
      return { message: 'Great job!', emoji: '🎉' };
    }
  };

  if (!quizData.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
        <p className="font-mono text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (quizCompleted) {
    const { message, emoji } = getFinalMessage();

    return (
      <div className="font-mono flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800 p-4">
        <div className="text-left w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-4xl font-bold mb-4 flex items-center">
            <span className="mr-4 text-6xl">{emoji}</span>
            {message}
          </h2>
          <p className="text-2xl font-semibold">
            Your Score: {score} out of {quizData.length}
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${
        feedback === 'correct'
          ? 'bg-green-100'
          : feedback === 'incorrect'
          ? 'bg-red-100'
          : 'bg-gray-50'
      } transition-colors duration-500`}
    >
      {showAnimation && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute left-1/5  text-6xl"
        >
          {feedback === 'correct' ? '🥳' : '😢'}
        </motion.div>
      )}

      {/* Live Score */}
      <div className="font-mono absolute top-8 right-8 text-lg font-bold bg-blue-100 px-4 py-2 rounded-full">
        Live Score: {score}
      </div>

      <div className="font-mono max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{currentQuestion.description}</h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-2 px-4 text-left rounded-lg bg-blue-100 hover:bg-blue-200 transition ${
                feedback &&
                (option.is_correct
                  ? 'bg-green-200 text-green-800'
                  : option === userAnswers[currentQuestionIndex]
                  ? 'bg-red-200 text-red-800'
                  : 'bg-blue-100 hover:bg-blue-200')
              }`}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== null} // Disable buttons after answering
            >
              {option.description}
            </button>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </p>
      </div>
    </div>
  );
};

export default Quiz;
