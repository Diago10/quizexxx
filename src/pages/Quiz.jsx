import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import {
  setQuizData,
  nextQuestion,
  setFeedback,
  resetFeedback,
  incrementScore,
  resetQuiz,
  setTimeRemaining,
  completeQuiz,
  addUserAnswer,
} from '../features/quizSlice';
import { fetchQuizData } from '../api/api';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Quiz = () => {
  const dispatch = useDispatch();
  const {
    quizData,
    currentQuestionIndex,
    feedback,
    showAnimation,
    userAnswers,
    quizCompleted,
    score,
    timeRemaining,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    const getQuizData = async () => {
      const data = await fetchQuizData();
      dispatch(setQuizData(data));
    };
    getQuizData();
  }, [dispatch]);

  useEffect(() => {
    if (timeRemaining > 0 && feedback === null) {
      const timer = setInterval(() => dispatch(setTimeRemaining(timeRemaining - 1)), 1000);
      return () => clearInterval(timer);
    }

    if (timeRemaining === 0 && feedback === null) {
      handleTimeout();
    }
  }, [timeRemaining, feedback, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetQuiz());
    };
  }, [dispatch]);

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      dispatch(nextQuestion());
    } else {
      dispatch(completeQuiz());
    }
  };

  const handleAnswer = async (selectedOption) => {
    const isCorrect = selectedOption.is_correct;

    if (isCorrect) {
      dispatch(incrementScore());
    }

    dispatch(setFeedback(isCorrect ? 'correct' : 'incorrect'));
    dispatch(addUserAnswer(selectedOption));

    await delay(2000);
    dispatch(resetFeedback());
    moveToNextQuestion();
  };

  const handleTimeout = async () => {
    if (feedback !== null) return;

    dispatch(setFeedback('incorrect'));

    await delay(2000);
    dispatch(resetFeedback());
    moveToNextQuestion();
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
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const { message, emoji } = getFinalMessage();

    return (
      <div className="font-mono flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800 p-4">
        <div className="text-left w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-4xl font-bold mb-4 flex items-center" aria-live="polite">
            <span className="mr-4 text-4xl md:text-5xl lg:text-6xl">{emoji}</span>
            {message}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Your Score: {score} out of {quizData.length}
          </p>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => {
              dispatch(resetQuiz());
            }}
            variant="primary"
            size="lg"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const timerStyle = timeRemaining <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-red-500 to-blue-500';

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${{
        correct: 'bg-green-100',
        incorrect: 'bg-red-100',
      }[feedback] || 'bg-gray-50'} transition-colors duration-500`}
    >
      {showAnimation && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute left-1/6 text-6xl"
          aria-live="polite"
        >
          {feedback === 'correct' ? '🥳' : '😢'}
        </motion.div>
      )}

      <div className="w-full max-w-lg mb-6">
        <motion.div
          className={`h-4 ${timerStyle} rounded-full`}
          style={{ width: `${(timeRemaining / 20) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
          aria-label={`Time remaining: ${timeRemaining} seconds`}
        />
      </div>

      <div
        className="font-mono absolute top-8 right-8 text-lg font-bold bg-blue-100 px-4 py-2 rounded-full"
        aria-live="polite"
      >
        Live Score: {score}
      </div>

      <div className="font-mono max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" aria-live="polite">
          {currentQuestion.description}
        </h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-2 px-6 md:py-2 md:px-4 text-left rounded-lg bg-blue-100 hover:bg-blue-200 transition 
                ${
                  feedback &&
                  (option.is_correct
                    ? 'bg-green-200 text-green-800'
                    : option === userAnswers[currentQuestionIndex]
                    ? 'bg-red-200 text-red-800'
                    : 'bg-blue-100 hover:bg-blue-200')
                }`}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== null} // Disable buttons after answering
              aria-label={`Option ${index + 1}: ${option.description}`}
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