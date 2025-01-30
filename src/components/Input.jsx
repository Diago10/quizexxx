import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, required = false, error }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-sm font-medium mb-1 ${required ? 'after:content-["*"] after:text-red-500' : ''}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;