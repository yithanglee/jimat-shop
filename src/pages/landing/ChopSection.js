import React from 'react';
import Slider from 'react-slick';
import Animation from './Animation';

import chooseVid from 'img/how-to-use/choose.mp4';
import orderVid from 'img/how-to-use/order.mp4';
import pickupVid from 'img/how-to-use/pickup.mp4';

const Methods = [
  {
    id: 1,
    image: chooseVid,
    description: [
      {
        eng: 'Choose your location',
        malay: 'Pilih lokasi anda',
      },
      {
        eng: 'Choose shops near you',
        malay: 'Pilih kedai berhampiran',
      },
    ],
  },
  {
    id: 2,
    image: orderVid,
    description: [
      {
        eng: 'Add your selections to cart',
        malay: 'Tempah barangan anda',
      },
      {
        eng: 'Pay Online or at store',
        malay: 'Bayar secara online atau di kedai',
      },
    ],
  },
  {
    id: 3,
    image: pickupVid,
    description: [
      {
        eng: 'Notification when ready to pickup',
        malay: 'Notifikasi barangan sedia untuk pickup',
      },
      {
        eng: 'Your receipt after pickup at store',
        malay: 'Resit anda selepas pickup di kedai',
      },
    ],
  },
];

const Controls = [
  {
    id: 0,
    title: () => {
      return (
        <>
          <span className="text-blue-700">Ch</span>oose
        </>
      );
    },
    description: 'Pilih Lokasi dan kedai berhampiran anda',
    descriptionEn: 'Choose location and shops near you',
  },
  {
    id: 1,
    title: () => {
      return (
        <>
          <span className="text-blue-700">O</span>rder
        </>
      );
    },
    description: 'Tempah dan bayar secara online',
    descriptionEn: 'Order and pay online',
  },
  {
    id: 2,
    title: () => {
      return (
        <>
          <span className="text-blue-700">P</span>ickup
        </>
      );
    },
    description: 'Pickup barangan anda dari kedai',
    descriptionEn: 'Pickup your orders from the shop',
  },
];

export default class ChopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSlide: 0 };
  }

  jump = index => {
    this.slider.slickGoTo(index, false);
  };

  render() {
    const settings = {
      dots: false,
      fade: true,
      autoplaySpeed: 10000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '30px',
      infinite: true,
      beforeChange: (current, next) => {
        this.setState({
          currentSlide: next,
        });
      },
    };
    return (
      <section id="how-to-use" className="">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div className="text-left">
            <h2 className="mb-3 text-4xl tracking-tight leading-5 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Jom Kita&nbsp;
              <span className="text-blue-700">CHOP</span>
            </h2>
            <p className="font-medium leading-tight text-black w-3/4">
              3 langkah mudah untuk membeli barangan keperluan anda
            </p>
            <p className="mb-10 font-medium leading-tight text-gray-700 w-3/4 italic">
              3 Easy Steps to shop for your needs
            </p>
            <div className=" grid grid-cols-3 gap-1 mt-5">
              {Controls.map(control => {
                const Title = control.title;
                let active =
                  this.state.currentSlide === control.id ? 'active' : '';
                return (
                  <div
                    key={control.id}
                    className={`chop-control cursor-pointer p-2 md:p-5 rounded ${active}`}
                    onClick={() => this.jump(control.id)}
                  >
                    <h4 className="text-md md:text-xl font-bold text-black mb-1">
                      <Title />
                    </h4>
                    <p className="text-xs md:text-sm font-medium text-black leading-tight mb-2">
                      {control.description}
                    </p>
                    <p className="text-sm font-medium text-gray-700 leading-tight italic">
                      {control.descriptionEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {Methods.map((method, index) => {
                return <Animation method={method} index={index} key={index} />;
              })}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}
