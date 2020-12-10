import React from 'react';
import PWAPrompt from 'react-ios-pwa-prompt';

import Navbar2 from 'components/Navbar2';
import Footer from 'components/Footer';
import HeroImage from 'img/LandingPage/hero-img.png';

import BrandLogoSection from './BrandLogoSection';
import ChopSection from './ChopSection';
import WhyUs from './whyus.js';
import GetTheApp from './GetTheApp';
import InstallButton from './InstallButton';
import 'style/newlanding.scss';

const Landing = () => (
  <div className="new-landing">
    <Navbar2 />
    <PWAPrompt
      promptOnVisit={1}
      timesToShow={3}
      delay={2000}
      copyClosePrompt="Close"
      permanentlyHideOnDismiss={false}
      copyBody="JiMATSHOP is built with app functionality. Add it to your home screen to use it in fullscreen and while offline"
    />
    <section
      id="main-hero"
      style={{
        backgroundImage: `url("${HeroImage}")`,
      }}
    >
      <div className="container">
        <div className="w-full md:w-2/3">
          <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-left">
              <h2 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                <span className="text-blue-700">
                  Lebih Jimat dan Mudah&nbsp;
                </span>
                <br />
                Untuk Barangan Keperluan
              </h2>
              <p className="mt-4 text-lg font-medium text-gray-800 w-3/4">
                Jimat lebih untuk barangan keperluan dari kedai dekat anda.
                Hanya 3 langkah mudah dan CHOP sekarang!
                <span className="block font-regular text-gray-500 italic mt-2">
                  Easy way to get attractive offers and meaningful rewards
                </span>
              </p>
              <div className="mt-5 sm:mt-8 sm:flex justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#how-to-use"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-900 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Jom Kita CHOP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ChopSection />
    <InstallButton />
    <BrandLogoSection />
    <WhyUs />
    <GetTheApp />
    <Footer />
  </div>
);

export default Landing;
