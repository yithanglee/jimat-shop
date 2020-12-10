import React from 'react';

const SummaryData = ({ quantity, header }) => {
  return (
    <div className="data p-2">
      <p className="text-xl md:text-2xl font-bold text-white">{quantity}</p>
      <p className="text-sm md:text-lg font-bold text-gray-400">{header}</p>
    </div>
  );
};

export default SummaryData;
