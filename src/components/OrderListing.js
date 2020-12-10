import React from 'react';
import { NavLink } from 'react-router-dom';

import 'style/order.scss';

function tagGenerator(status) {
  switch (status) {
    case 'Ready to Pickup':
      return 'yellow';
    case 'Success':
      return 'green';
    case 'Paid':
      return 'green';
    case 'Cancelled':
      return 'red';
    default:
      return 'gray';
    // code block
  }
}

const OrderListing = props => {
  const { order } = props;

  const status = order.pickup_status
    ? order.status === 'Fulfilled'
      ? 'Success'
      : 'Ready to Pickup'
    : order.status;
  const tag = tagGenerator(status);

  return (
    <div className={`order shadow ${status}`}>
      <div className={`status-bar ${tag}`}></div>
      <NavLink exact to={'/order/' + order.id}>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-${tag}-100 text-${tag}-800`}
        >
          <svg
            className={`-ml-0.5 mr-1.5 h-2 w-2 text-${tag}-800`}
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
          {status}
        </span>
        <div className="shop">
          <p className="text-md leading-5 font-bold font-medium text-black">
            {order.outlet_name}
          </p>
          <p className="text-xs leading-4 text-gray-500">
            {order.outlet_address}
          </p>
          <div className="shop-item">
            {order.line_items.slice(0, 3).map(item => {
              return (
                <div className="item" key={item.barcode}>
                  <p className="text-xs leading-4 text-blue-900">{item.name}</p>
                  <p className="text-xs leading-4 text-blue-900">
                    &#10005;&nbsp;
                    {item.quantity}
                  </p>
                </div>
              );
            })}
            {order.line_items.length > 3 && (
              <p className="text-right text-xs leading-4 text-gray-500 pt-2">
                and more items ...
              </p>
            )}
          </div>
        </div>
        <div className="payment">
          <p className="text-md leading-5 font-bold font-medium text-blue-900">
            {order.total_price}
          </p>
        </div>
      </NavLink>
    </div>
  );
};
export default OrderListing;
