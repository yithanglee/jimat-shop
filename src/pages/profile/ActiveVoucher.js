import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveVoucher = ({ id, name, outlet, credit, color, role }) => {
  const amount = credit && credit.amount;
  return (
    <NavLink
      exact
      className="rounded-lg shadow-lg overflow-hidden inline-block"
      to={`/wallet/${id}?name=${name}&outlet=${outlet}`}
    >
      <div className={`px-2 py-2 bg-${color}-500 h-full`}>
        <p
          className={`uppercase inline-block mb-1 px-2 py-1 rounded opacity-50 bg-white text-md font-medium text-${color}-900`}
        >
          {name}
        </p>
        <p className="h-8 text-lg font-bold text-white mb-5">{outlet}</p>
        <div className="text-right">
          <p className={`text-sm font-medium  text-white`}>Balance</p>
          <p className="text-xl leading-none font-extrabold text-white">
            {amount ? amount : 'MYR 0.00'}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ActiveVoucher;
