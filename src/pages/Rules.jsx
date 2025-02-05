import React from 'react';
import Button from '../components/Button'

const Rules = ({ onStart }) => {
  return (
    <div className="font-mono flex flex-col items-center justify-center h-screen text-white"
    style={{
      backgroundImage: "url('https://wallpapercave.com/wp/wp2694479.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8">Quiz Rules</h2>
      <ul className="text-sm md:text-2l lg:text-4xl list-disc mb-8 ml-6">
        <li className='mb-6 md:mb-8'>Each question has multiple-choice answers.</li>
        <li className='mb-6 md:mb-8'>You can only select one answer per question.</li>
        <li className='mb-6 md:mb-8'>Your score will be calculated at the end of the quiz.</li>
        <li className='mb-6 md:mb-8'>Good luck!</li>
      </ul>
      <Button type='submit' variant='orange' onClick={onStart}>Start Quiz</Button>
    </div>
  );
};

export default Rules;