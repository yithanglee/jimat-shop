import React from 'react';

import Navbar2 from 'components/Navbar2';
import Footer from 'components/Footer';

import Hero from '../../img/about-jimat/hero.png';
import Cashier from '../../img/about-jimat/cashier.png';
import Angkasa from '../../img/about-jimat/angkasa-logo.png';
import 'style/about-jimat.scss';

const aboutJimat = props => {
  return (
    <div className="about-jimat new-landing">
      <Navbar2 />
      <section id="hero">
        <div className="content">
          <div className="mx-auto max-w-screen-xl px-4 mt-12 sm:px-6 md:mt-20 xl:mt-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left mb-10">
                <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-4xl xl:text-5xl">
                  Membantu Pembangunan Perniagaan Anda dengan <br />
                  <span className="text-blue-700"> Mudah dan Cepat</span>
                </h2>
                <p className="mt-4 text-lg font-medium text-gray-800 ">
                  Misi kami adalah untuk membantu meningkatkan perniagaan
                  industri kecil dan sederhana melalui digitalisasi
                  <span className="block font-regular text-gray-500 italic mt-2">
                    Our mission is to digitalise small and medium businesses and
                    to empower them to grow.
                  </span>
                </p>
              </div>
              <div className="relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center mb-10">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <button className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                    <img
                      className="w-full"
                      src={Hero}
                      alt="Woman making a sale"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="purpose">
        <div className="relative max-w-3xl mx-auto  text-center">
          <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-blue-700 sm:text-4xl sm:leading-10">
            Pembangunan Komuniti
          </h3>
          <h3 className="text-2xl italic leading-8 font-bold text-gray-400 tracking-tight sm:text-3xl sm:leading-9">
            Growing Communities
          </h3>
          <p className="mt-4   text-lg font-medium text-gray-800 ">
            Merapatkan jurang antara offline dan online dengan digitalisasi
            perniagaan komuniti tempatan melalui Ekosistem JiMAT
            <span className="block font-regular text-gray-500 italic mt-2">
              Bridging the gap between offline and online businesses by
              digitalising local businesses through JiMAT Ecosystem
            </span>
          </p>
        </div>
      </section>
      <section id="angkasa">
        <img src={Angkasa} alt="" className="mx-auto" />

        <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          BA100 via JiMAT
        </h3>
        <p className="mt-4 max-w-3xl mx-auto text-lg font-medium text-gray-700 ">
          JiMAT Marketplace is the national digital platform for all
          cooperatives to drive BA100, a national project endorsed by our Prime
          Minister and Malaysian Government aimed to unite and help small &
          medium businesses in an effort to address the rising cost of living
          for consumers in Malaysia.
        </p>

        <a target="blank" href="https://robugroup.com/ba100">
          <div className="button">
            <div className="rounded-md shadow">
              <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                More about BA100
              </span>
            </div>
          </div>
        </a>
      </section>
      <section id="join-community" className="mb-5">
        <img src={Cashier} alt="" className="mx-auto" />
        <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-blue-700 sm:text-4xl sm:leading-10">
          Sertai Gerakan Komuniti Ini
        </h3>
        <h3 className="text-2xl italic leading-8 font-bold text-gray-400 tracking-tight sm:text-3xl sm:leading-9">
          Join the Community
        </h3>

        <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500"></p>
        <p className="mt-4   text-lg font-medium text-gray-800 ">
          Hubungi kami jika anda adalah peruncit atau pembekal
          <span className="block font-regular text-gray-500 italic mt-2">
            Get in touch if you’re a retailer or supplier
          </span>
        </p>
        <a target="blank" href="https://robugroup.com/about">
          <div className="button">
            <div className="rounded-md shadow">
              <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                Get In Touch
              </span>
            </div>
          </div>
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default aboutJimat;
