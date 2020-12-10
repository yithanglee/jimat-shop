import React from 'react';
import GoogleAuth from 'components/GoogleAuth';
import { ReactComponent as Buy } from '../img/man-buy.svg';

const AuthBanner = () => {
  return (
    <GoogleAuth>
      <div className="banner bg-white rounded shadow p-5">
        <div className="banner-img">
          <Buy />
        </div>
        <div className="banner-content">
          <h3 className="text-xl leading-6 font-bold text-gray-900 mb-1">
            Sign up to JiMAT
          </h3>
          <p className="text-md leading-4 font-medium text-gray-500 mb-5">
            Make your account with JiMAT to place your order
          </p>
          <p className="text-md leading-4 font-medium text-blue-800">
            Sign up with Google
          </p>
        </div>
      </div>
    </GoogleAuth>
  );
};

export default AuthBanner;
