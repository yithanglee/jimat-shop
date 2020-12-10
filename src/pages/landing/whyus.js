import React from 'react';
// import Step3 from 'img/Steps/step3.png';
import Step1 from 'img/Steps/step-1.png';
import Step2 from 'img/Steps/step-2.png';
import Step3 from 'img/Steps/step-3.png';

const WhyUs = () => {
  return (
    <div className="bg-gray-50 overflow-hidden">
      <div className="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <svg
          className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
          />
        </svg>

        <div className="relative lg:grid lg:grid-cols-3 lg:col-gap-8">
          <div className="">
            <h3 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              A better way to shop groceries.
            </h3>
          </div>
          <div className="mt-10 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0">
            <div className="flex items-center flex-wrap md:justify-center md:flex-no-wrap my-10 md:mb-0 ">
              <img alt="muchnys logo" src={Step1} className="image-yeah" />
              <div className="flex-shrink-0 flex-grow-0 w-full md:w-auto md:flex-shrink md:flex-grow mt-5 md:pl-10">
                <h4 className="text-2xl leading-8 font-extrabold text-yellow-400 tracking-tight sm:text-3xl sm:leading-9">
                  Lebih Jimat
                </h4>
                <h4 className="text-2xl italic leading-8 font-bold text-gray-700 tracking-tight sm:text-3xl sm:leading-9">
                  Great Savings
                </h4>
                <p className="mt-4 text-md font-medium text-gray-800">
                  Tawaran hebat untuk semua keperluan harian dan rumah
                  <span className="block font-regular text-gray-500 italic mt-2">
                    Enjoy great discounts on your everyday needs from groceries
                    to household items
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center flex-row-reverse flex-wrap md:justify-center md:flex-no-wrap my-10 md:mb-0 ">
              <img
                alt="muchnys logo"
                src={Step2}
                className="image-yeah reverse"
              />
              <div className="flex-shrink-0 flex-grow-0 w-full md:w-auto md:flex-shrink md:flex-grow mt-5 md:pr-10">
                <h4 className="text-2xl leading-8 font-extrabold text-yellow-400 tracking-tight sm:text-3xl sm:leading-9">
                  Kedai Berhampiran Anda
                </h4>
                <h4 className="text-2xl italic leading-8 font-bold text-gray-400 tracking-tight sm:text-3xl sm:leading-9">
                  Shops Near You
                </h4>
                <p className="mt-4 text-md font-medium text-gray-800">
                  Dapatkan kesemua keperluan harian dari kedai dekat anda, dan
                  lebih jimat
                  <span className="block font-regular text-gray-500 italic mt-2">
                    Find everything you usually buy at shops near you, more
                    options more savings
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center flex-wrap md:justify-center md:flex-no-wrap mb-10 md:mb-0 ">
              <img alt="muchnys logo" src={Step3} className="image-yeah" />
              <div className="flex-shrink-0 flex-grow-0 w-full md:w-auto md:flex-shrink md:flex-grow mt-5 md:pl-10">
                <h4 className="text-2xl leading-8 font-extrabold text-yellow-400 tracking-tight sm:text-3xl sm:leading-9">
                  Lebih Dekat Lebih Mudah
                </h4>
                <h4 className="text-2xl italic leading-8 font-bold text-gray-400 tracking-tight sm:text-3xl sm:leading-9">
                  Fast and Convenient
                </h4>
                <p className="mt-4 text-md font-medium text-gray-800">
                  Elakkan beratur panjang dan kesesakan trafik. Beli online dan
                  jemput barangan dengan mudah
                  <span className="block font-regular text-gray-500 italic mt-2">
                    Avoid long lines and traffic jams, shop online and pick up
                    your groceries at your convenience
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
