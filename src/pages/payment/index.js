import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { NavLink } from 'react-router-dom';
import { getAllCartItems } from 'redux/slices/carts';

import { default as SubHeader } from 'components/header';
import CartSummary from 'components/CartSummary';
import Section from 'components/section';
import Layout from 'components/Layout';
import BankLogo from './BankLogo';
import ContentLoader from 'components/ContentLoader';
import { payOrder } from 'redux/slices/orders';
import api from 'utils/api';
import 'style/payment.scss';

const Payment = props => {
  const dispatch = useDispatch();
  const [banks, setBanks] = useState([]);
  const [payInStore, setPayInStore] = useState(false);
  const cartSummary = useSelector(state => state.carts.cartSummary);
  const allCartItems = useSelector(state => getAllCartItems(state));
  const outletId = useSelector(state => state.carts.cartOutlet);
  const isPaymentLoading = useSelector(state => state.orders.loading);
  const [selectedBank, setSelectedBank] = useState('');
  const [isCreditUsed, toggleCreditUsed] = useState(false);
  const [isPayInStoreUsed, togglePayInStore] = useState(false)

  const user = useSelector(state => {
    if (Object.entries(state.auth.user.jimat).length === 0) {
      return false;
    } else {
      return state.auth.user.jimat;
    }
  });

  const isMembershipAvailable =
    user &&
    user.memberships.filter(membership => {
      return (
        membership.outlet_id.toString() === outletId &&
        membership.credit &&
        membership.credit.amount_cents > 0
      );
    });

  const isMembershipVerified =
    user &&
    user.memberships.filter(membership => {
      return membership.outlet_id.toString() === outletId && membership.verified
    });

  useEffect(() => {
    if (!banks.length) {
      api.GET('billing/payment_methods/banks').then(response => {
        setBanks(response.data.banks);
      });
    }
  }, [banks, setBanks]);

  useEffect(() => {
    if (!outletId) return;

    api.GET(`outlets/${outletId}`).then(response => {
      setPayInStore(response.data.item.pay_in_store)
    })
  }, [outletId])

  const handleClick = () => {
    dispatch(
      payOrder(
        outletId,
        {
          line_items: allCartItems.map(item => {
            return {
              quantity: item.quantity,
              barcode: item.barcode,
            };
          }),
        },
        {
          payment_method: {
            type: (isPayInStoreUsed) ? 'pay_in_store' : 'bank',
            code: selectedBank,
          },
        },
        isCreditUsed
      )
    ).then(redirect_url => {
      if (redirect_url) {
        window.location.replace(redirect_url);
      }
    });
  };

  const toggleCredit = value => {
    toggleCreditUsed(value)
  };

  const togglePayStore = value => {
    if (value) setSelectedBank(`OUTLET-${outletId}`)
    togglePayInStore(value)
  }

  const Footer = () => {
    return (
      <div className="bottom-action-bar">
        <Button
          isLoading={isPaymentLoading}
          disabled={!selectedBank && cartSummary.net_price_cents > 0}
          onClick={handleClick}
        >
          Pay {cartSummary && cartSummary.net_price}
        </Button>
      </div>
    );
  };

  return (
    <Layout footer={Footer} background="white">
      <SubHeader>
        <p className="header-title">Make Payment</p>
        <p className="header-description">Choose a payment method</p>
      </SubHeader>
      <Section>
        <p className="cart-summary-link">
          <NavLink to="/cart">&larr; Return to checkout details</NavLink>
        </p>
        <CartSummary
          handleCreditToggle={toggleCredit}
          ready_to_pay={isMembershipAvailable.length > 0}
          membership_verified={isMembershipVerified.length > 0}
        />
      </Section>
      {cartSummary && cartSummary.net_price_cents > 0 && (
        <Section header="Payment Method" klass="pb-20">
          <div className="list-item bg-white">
            <div className="list-content full-width">
              <p className="text-sm leading-5 font-bold font-medium text-gray-800">
                Online Banking
              </p>
            </div>

            {banks.length === 0 ? (
              <ContentLoader height="165" background="white" />
            ) : (
              <div className="banks">
                {banks.map(bank => {
                  return (
                    bank.name &&
                    bank.active && (
                      <span
                        className={`bank ${selectedBank === bank.code &&
                          'selected'}`}
                        key={bank.code}
                        value={bank.code}
                        onClick={() => {
                          setSelectedBank(bank.code);
                        }}
                      >
                        {BankLogo[bank.name] && (
                          <img src={BankLogo[bank.name]} alt={bank.name} />
                        )}
                        <span className="bank-name">
                          {bank.name || 'TEST BANK'}
                        </span>
                      </span>
                    )
                  );
                })}
              </div>
            )}
          </div>
          <div className="list-item bg-white">
            <div className="list-content">
              <p className="text-sm leading-5 font-bold font-medium text-gray-800">
                Pay In Store
              </p>
            </div>
            {payInStore
              ? <input
                  id="pay_in_store"
                  type="checkbox"
                  onChange={togglePayStore}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              : <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-400 text-white">
                  Coming Soon
                </span>
            }
          </div>
          <div className="list-item">
            <div className="list-content">
              <p className="text-sm leading-5 font-bold font-medium text-gray-800">
                Credit / Debit Card
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-400 text-white">
              Coming Soon
            </span>
          </div>
        </Section>
      )}
    </Layout>
  );
};

export default Payment;
