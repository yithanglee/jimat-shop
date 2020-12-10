import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button';

import { addItemToCart, removeItemFromCart } from 'redux/slices/carts';
import { getAllCartItems } from 'redux/slices/carts';
import { default as SubHeader } from 'components/header';
import ProductListing from 'components/ProductListing';
import CartSummary from 'components/CartSummary';
import Section from 'components/section';
import Layout from 'components/Layout';
import LoginModal from './LoginModal';

import 'style/cart.scss';

const Cart = props => {
  const [isModalOpen, toggleModal] = useState(false);

  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const allCartItems = useSelector(state => getAllCartItems(state));
  const outletId = useSelector(state => state.carts.cartOutlet);

  const Footer = () => {
    return (
      <div className="bottom-action-bar">
        <Button
          disabled={allCartItems.length === 0}
          onClick={() => {
            if (accessToken) {
              props.history.push(`/payment`);
            } else {
              toggleModal(!isModalOpen);
            }
          }}
        >
          Checkout
        </Button>
      </div>
    );
  };

  const addItem = item => {
    dispatch(addItemToCart({ item, outletId: props.match.params.outlet_id }));
  };

  const removeItem = item => {
    dispatch(removeItemFromCart(item));
  };

  return (
    <Layout footer={Footer} background="white">
      <SubHeader withClearCart>
        <p className="header-title">Your Cart</p>
        <p className="header-description">Review Your Items</p>
      </SubHeader>
      <LoginModal
        isModalOpen={isModalOpen}
        toggleModal={() => {
          toggleModal(!isModalOpen);
        }}
      />

      <Section>
        <CartSummary />
        {allCartItems.length !== 0 && (
          <p className="cart-summary-link">
            <NavLink to={`/outlet/${outletId}`}>
              &larr; Edit / Add Items
            </NavLink>
          </p>
        )}
      </Section>

      {allCartItems.length !== 0 ? (
        <Section header="Item List" padding="vertical">
          {allCartItems.map(item => (
            <ProductListing
              key={item.barcode}
              horizontal
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
    </Layout>
  );
};

export default Cart;
