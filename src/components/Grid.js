import React from 'react';
import 'style/grid.scss';
const Row = props => {
  return (
    <div
      className="grid-row"
      style={{ flexDirection: props.flexEnd ? 'row-reverse' : 'row' }}
    >
      {props.children}
    </div>
  );
};

const Col = props => {
  return (
    <div
      className="grid-col"
      style={{ width: props.size, flexBasis: props.size }}
    >
      {props.children}
    </div>
  );
};

export { Row, Col };
