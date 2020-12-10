import React from 'react';
import iPhone from 'img/how-to-use/iphone.png';

const Animation = ({ method, index }) => {
  return (
    <div className="how-to-use text-center" key={index}>
      <div className="relative how-to m-auto lg:m-0">
        <img alt="iphone" src={iPhone} />
        <div className="absolute top-0 left-0 video">
          <video autoPlay={true} loop={true} muted={true} playsInline={true}>
            <source src={method.image} type="video/mp4" />
            Your browser does not support the video tag
          </video>
        </div>
        <div className="hidden md:block text-left rounded chop-card absolute p-4">
          {method.description.map((des, index) => {
            return (
              <div
                key={index}
                className={`text-gray-200 ${index !== 0 && 'mt-5'}`}
              >
                <span className="block text-md leading-tight font-bold">
                  {des.malay}
                </span>
                <span className="block text-xs leading-tight font-medium italic">
                  {des.eng}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Animation;
