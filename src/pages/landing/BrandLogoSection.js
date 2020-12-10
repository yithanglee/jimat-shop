import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';

import Faiza from 'img/Brand/faiza.png';
import FN from 'img/Brand/fn.jpg';
import Saji from 'img/Brand/saji.png';
import Nestle from 'img/Brand/nestle.png';
import Munchy from 'img/Brand/munchy.png';
import Adabi from 'img/Brand/adabi.png';

const Brands = [Faiza, FN, Nestle, Munchy, Adabi, Saji];

const BrandLogoSection = props => {
  return (
    <section id="brand" className="py-24">
      <div className="container">
        <div className="relative brand-hover-section">
          <div className="brand-list grid grid-cols-3 md:grid-cols-6 gaps-2 items-center  ">
            {Brands.map((brand, index) => {
              return (
                <span
                  className="brand inline-block text-center p-5"
                  key={index}
                >
                  <LazyLoadImage
                    alt="brand logo"
                    effect="blur"
                    src={brand}
                    className="inline-block"
                  />
                </span>
              );
            })}
          </div>
          <div className="rounded-md shadow-2xl absolute brand-button">
            <NavLink exact to="/home">
              <span className="w-full flex items-center justify-center text-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out">
                Shop All Brands
              </span>
            </NavLink>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-xs md:text-sm font-medium text-black leading-tight">
            Dan Banyak Lagi
          </p>
          <p className="text-sm font-medium text-gray-700 leading-tight italic">
            And Many More
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandLogoSection;
