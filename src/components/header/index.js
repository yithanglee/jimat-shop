import React from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { NavLink, withRouter, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'components/Icon';

import { clearCart, getAllCartItems } from '../../redux/slices/carts';
import { toggleSidebar } from '../../redux/slices/ui';

import 'style/header.scss';

const Cart = ({ isDesktop, allCartItems, toggleSidebar }) => {
  const history = useHistory();
  return (
    <div
      className="shopping-cart"
      onClick={() => {
        if (isDesktop) {
          toggleSidebar();
        } else {
          history.push('/cart');
        }
      }}
    >
      {allCartItems === 0 || <span>{allCartItems}</span>}
      <Icon type="shopping-bag" stroke="#000000" />
    </div>
  );
};

const SubHeader = props => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderPath = useRouteMatch('/order/:id')
  const isDesktop = useMediaQuery({ query: '(min-width: 480px)' });
  const allCartItems = useSelector(state => getAllCartItems(state)).length;
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleClick = () => {
    const referrer = location.pathname.match(/order/gi)
    return (orderPath) 
      ? (referrer && referrer.length) ? props.history.push('/orders') : props.history.goBack() 
      : props.history.goBack();
  }

  return (
    <div className={clsx(`header`, props.transparent ? 'transparent' : '')}>
      <div className="header-wrapper">
        <span
          className="back-btn"
          onClick={() => handleClick()}
        >
          <Icon size="large" type="chevron-left" stroke="#000000" />
        </span>
        {props.withCart && (
          <Cart
            isDesktop={isDesktop}
            allCartItems={allCartItems}
            toggleSidebar={() => {
              dispatch(toggleSidebar());
            }}
          />
        )}
        {props.withClearCart && (
          <div onClick={handleClearCart}>
            <Icon type="trash" stroke="#000000" />
          </div>
        )}
      </div>
      {props.children && <div className="header-content">{props.children}</div>}
    </div>
  );
};
const MainHeader = props => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 480px)' });
  const allCartItems = useSelector(state => getAllCartItems(state)).length;
  const selectedLocation = useSelector(
    state => state.location.selectedLocation
  );

  const isHidden = !['/home', '/orders'].includes(props.location.pathname);
  if (!isHidden) {
    return (
      <div className="header fixed md:relative z-10 w-full">
        <div className="header-wrapper main-header">
          <div className="location">
            <NavLink exact to="/location">
              <p className="text-md leading-5 font-bold text-black">
                {selectedLocation}
              </p>
            </NavLink>
            <Icon type="chevron-down" stroke="#000000" />
          </div>

          <div className="search ">
            <NavLink exact to="/search">
              <Icon type="search" size="small" />
              <p className="ml-2  max-w-3xl text-sm leading-7 text-gray-400 truncate">
                Search products
              </p>
            </NavLink>
          </div>
          <Cart
            isDesktop={isDesktop}
            allCartItems={allCartItems}
            toggleSidebar={() => {
              dispatch(toggleSidebar());
            }}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
const Header = withRouter(MainHeader);
export { Header };
export default withRouter(SubHeader);
