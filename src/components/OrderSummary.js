import React from 'react';
import withLoader from 'components/helper/withLoader';

import 'style/order-summary.scss';

const OrderSummary = props => (
  <div className="order-summary bg-white" style={props.style}>
    {props['no-header'] || <p>Order Summary</p>}
    {Object.keys(props.order).map((item, index) => {
      if (props.order[item] !== null) {
        return (
          <div className="order-item" key={index}>
            <span>{item}</span>
            <span>{props.order[item]}</span>
          </div>
        );
      } else {
        return null;
      }
    })}
  </div>
);

export default withLoader(OrderSummary, { height: '120' });
