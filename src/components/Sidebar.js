import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  getAllCartItems,
} from 'redux/slices/carts';
import { hideSidebar } from 'redux/slices/ui';
import ProductListing from 'components/ProductListing';
import CartSummary from 'components/CartSummary';
import GoogleAuth from 'components/GoogleAuth';
import Section from 'components/section';
import Button from 'components/Button';
import 'style/sidebar.scss';

const Sidebar = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSidebarShow = useSelector(state => state.ui.showSidebar);
  const accessToken = useSelector(state => state.auth.accessToken);
  const outletId = useSelector(state => state.carts.cartOutlet);
  const allCartItems = useSelector(state => getAllCartItems(state));

  const addItem = item => {
    dispatch(addItemToCart({ item, outletId }));
  };

  const removeItem = item => {
    dispatch(removeItemFromCart(item));
  };

  const clearAllItemt = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (['/', '/about-jimat'].includes(props.location.pathname)) {
      dispatch(hideSidebar());
    }
  }, [dispatch, props.location.pathname]);

  return (
    <div className={`sidebar ${isSidebarShow || 'active'}`}>
      <div className="sidebar-wrapper">
        <Section padding="noBottom">
          <div className="text-right">
            <span onClick={clearAllItemt}>
              <p className="text-md leading-5 font-bold font-medium text-black">
                Clear
              </p>
            </span>
          </div>
        </Section>
        <Section>
          <CartSummary />
        </Section>
        {allCartItems.length !== 0 ? (
          <Section header="Item List" padding="vertical">
            {allCartItems.map(item => (
              <ProductListing
                horizontal
                key={item.barcode}
                product={item}
                quantityInCart={item.quantity}
                addToCart={addItem}
                removeFromCart={removeItem}
              />
            ))}
          </Section>
        ) : (
          <Section>
            <h1 style={{ textAlign: 'center' }}>Empty Cart</h1>
          </Section>
        )}
      </div>
      <div className="sidebar-footer">
        {accessToken ? (
          <Button
            disabled={allCartItems.length === 0}
            onClick={() => {
              history.push(`/payment`);
            }}
          >
            Checkout
          </Button>
        ) : (
          <GoogleAuth
            text="Signin to Proceed"
            onSuccessCallback={() => {
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
