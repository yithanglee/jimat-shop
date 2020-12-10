import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../img/logo/jimatshop.png';
import Profile from '../img/profile.svg';
import { NavLink } from 'react-router-dom';
import GoogleAuth from 'components/GoogleAuth';
import 'style/navbar.scss';

const Navbar2 = () => {
  const isSignIn = useSelector(state => state.auth.isUserLogin);
  return (
    <div className="w-full absolute top-0 left-0 px-4 py-4">
      <div className="flex flex-row justify-between items-center">
        <div className="w-56">
          <NavLink exact to="/">
            <img src={Logo} alt="" />
          </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <NavLink exact to="/about-jimat" className="hidden md:block">
            <p className="text-md leading-5 font-bold font-medium text-blue-900 py-3 px-1 text-center">
              About Jimat
            </p>
          </NavLink>
          <NavLink exact to="/home" className="ml-1 mr-6 hidden md:block">
            <p className="text-md leading-5 font-bold font-medium text-blue-900 py-3 px-1 text-center">
              Browse Shop
            </p>
          </NavLink>
          {isSignIn ? (
            <NavLink exact to="/profile" className="ml-1 flex">
              <div className="flex text-md leading-5 font-bold font-medium text-white py-3 px-4 text-center bg-blue-900 rounded-md">
                <img className="w-4 h-4 mr-2" src={Profile} alt="User"/>
                Profile
              </div>
            </NavLink>
          ) : (
            <GoogleAuth>
              <p className="text-md leading-5 font-bold font-medium bg-yellow-400 text-white py-3 px-4 text-center rounded-md">
                Sign In
              </p>
            </GoogleAuth>
          )}
        </div>
      </div>
      <div className="md:hidden block mt-3">
        <NavLink exact to="/about-jimat" className="inline-block py-2 px-2">
          <p className="text-md leading-5 font-bold font-medium text-blue-900 text-left">
            About Jimat
          </p>
        </NavLink>
        <NavLink exact to="/home" className="inline-block py-2 px-4">
          <p className="text-md leading-5 font-bold font-medium text-blue-900 text-left">
            Browse Shop
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar2;
