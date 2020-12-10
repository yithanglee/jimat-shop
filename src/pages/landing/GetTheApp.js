import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Basket from 'img/basket.png';

const GetTheApp = () => {
  return (
    <section id="get-the-app">
      <div className="">
        <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-blue-700 sm:text-4xl sm:leading-10">
          Dapatkan App JiMATSHOP Sekarang
        </h3>
        <h3 className="text-2xl italic leading-8 font-bold text-gray-400 tracking-tight sm:text-3xl sm:leading-9">
          Experience JiMATSHOP App Now
        </h3>
        <p className="mt-4 text-md font-medium text-gray-800">
          Save JiMAT on your phone and start <br />
          shopping smart
        </p>
        <NavLink exact to="/home">
          <div className="button">
            <div className="rounded-md shadow">
              <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                Shop Now
              </span>
            </div>
          </div>
        </NavLink>
      </div>
      <LazyLoadImage
        alt="just a basket"
        effect="blur"
        src={Basket}
        className="mx-auto"
      />
    </section>
  );
};

export default GetTheApp;
