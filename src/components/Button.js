import React from 'react';

import 'style/button.scss';

const LoadingIcon = () => (
  <svg
    className="loader"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FFF"
      fillRule="nonzero"
      d="M4.208 15.492a.732.732 0 0 1-1.335.6A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.965 9.965 0 0 1-6.347-2.272.732.732 0 0 1 .929-1.13 8.537 8.537 0 1 0-2.374-3.106z"
    />
  </svg>
);

const Button = ({
  border,
  variant,
  size,
  disabled,
  children,
  onClick,
  icon,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <button
        className={`
        text-center items-center px-4 py-3 leading-5 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out
      ${border && 'border'}
      ${variant}
      ${size}
    `}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        <LoadingIcon className="loader" />
      </button>
    );
  }

  return (
    <button
      className={`
        text-center items-center px-4 py-3 leading-5 font-medium rounded-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out
        ${
          border
            ? 'border bg-white text-gray-500'
            : 'bg-blue-900 hover:bg-blue-500 text-white'
        }
        ${variant}
        ${size}
      `}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
