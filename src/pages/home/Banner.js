import React from 'react';
import Slider from 'react-slick';
import withLoader from 'components/helper/withLoader';
import 'style/banner.scss';
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  accessibility: false,
  arrows: false,
  centerMode: true,
  centerPadding: '30px',
  className: 'banner-slider',
  dotsClass: 'slick-dots banner-dots',
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        centerPadding: '30px',
      },
    },
  ],
};

const Banner = withLoader(
  ({ banners }) => {
    return (
      <Slider {...settings}>
        {banners.map((banner, index) => {
          return (
            <div className="banner-wrapper" key={index}>
              <div
                className="banner promotion-banner"
                style={{
                  backgroundImage: `url("${banner.item.image_url}")`,
                }}
              ></div>
            </div>
          );
        })}
      </Slider>
    );
  },
  { height: '180' }
);

export default Banner;
