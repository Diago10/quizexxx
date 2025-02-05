// src/features/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizData: [],
    currentQuestionIndex: 0,
    feedback: null,
    showAnimation: false,
    userAnswers: [],
    quizCompleted: false,
    score: 0,
    timeRemaining: 20,
  },
  reducers: {
    setQuizData(state, action) {
      state.quizData = action.payload;
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
      state.timeRemaining = 20; // Reset timer for the next question
    },
    setFeedback(state, action) {
      state.feedback = action.payload;
      state.showAnimation = true;
    },
    resetFeedback(state) {
      state.feedback = null;
      state.showAnimation = false;
    },
    incrementScore(state) {
      state.score += 1;
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.score = 0;
      state.quizCompleted = false;
      state.timeRemaining = 20;
    },
    setTimeRemaining(state, action) {
      state.timeRemaining = action.payload;
    },
    completeQuiz(state) {
      state.quizCompleted = true;
    },
    addUserAnswer(state, action) {
      state.userAnswers[state.currentQuestionIndex] = action.payload;
    },    
  },
});

export const {
  setQuizData,
  nextQuestion,
  setFeedback,
  resetFeedback,
  incrementScore,
  resetQuiz,
  setTimeRemaining,
  completeQuiz,
  addUserAnswer,
} = quizSlice.actions;

export default quizSlice.reducer;