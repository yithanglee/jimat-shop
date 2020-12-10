import React from 'react';
import 'style/scrollable.scss';

const Scrollable = props => {
  return <div className="slider">{props.children}</div>;
};

export const ScrollableItem = props => {
  const width = props.width ? props.width + 12 + 'px' : 'auto';
  return (
    <div className="slider-item" style={{ width: width, flexBasis: width }}>
      {props.children}
    </div>
  );
};

export default Scrollable;
