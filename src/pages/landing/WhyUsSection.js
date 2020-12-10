import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Row, Col } from 'components/Grid';

import Step1 from 'img/Steps/step2.png';
import Step2 from 'img/Steps/step1.png';
import Step3 from 'img/Steps/step3.png';

const Steps = [
  {
    id: 1,
    title: 'Great Savings',
    content:
      'Enjoy great discounts on your everyday needs from groceries to household items',
    image: Step1,
    rotate: false,
  },
  {
    id: 2,
    title: 'Shops Near You',
    content:
      'Find everything you usually buy at shops near you, more options more savings',
    image: Step2,
    rotate: true,
  },
  {
    id: 3,
    title: 'Fast and Convenient',
    content:
      'Avoid long lines and traffic jams, shop online and pick up your groceries at your convenience',
    image: Step3,
    rotate: false,
  },
];

const WhyUsSection = () => {
  return (
    <section id="reason">
      <div className="container">
        {Steps.map(step => {
          return (
            <Row flexEnd={step.rotate} key={step.id}>
              <Col size="50%">
                <div className="step-image">
                  <LazyLoadImage
                    alt="muchnys logo"
                    effect="blur"
                    src={step.image}
                  />
                </div>
              </Col>
              <Col size="50%">
                <div className="step-content">
                  <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-blue-900 sm:text-4xl sm:leading-10">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
                    {step.content}
                  </p>
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    </section>
  );
};

export default WhyUsSection;
