import React from 'react';
import { NavLink } from 'react-router-dom';
import withLoader from 'components/helper/withLoader';

const NotificationBanner = withLoader(
  ({ orders }) => {
    if (orders.length > 0) {
      return (
        <NavLink exact to="/orders">
          <div className="notification">
            <p className="text-lg leading-5 font-bold text-yellow-300 mb-2">
              You have {orders.length} pending orders.
            </p>
            <div className="shop-example mb-2">
              <p className="text-md leading-4 font-medium text-white mb-1">
                {orders[0].outlet_name}
              </p>
              <p className="text-sm leading-4 text-gray-200">
                {orders[0].outlet_address}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm leading-4 text-white">
                Click to view all orders
              </p>
            </div>
          </div>
        </NavLink>
      );
    } else {
      return null;
    }
  },
  { height: '150' }
);

export default NotificationBanner;
