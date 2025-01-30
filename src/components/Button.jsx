import React from 'react';

const Button = ({ children, onClick, key, variant = 'primary', size = 'md', type = 'button', disabled = false }) => {
  const baseStyles = 'font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200 ease-in-out';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    orange: 'bg-orange-400 text-white hover:bg-orange-500',
  };
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      key={key}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;