import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { NavLink } from 'react-router-dom';
import { getOrder, fetchOrder } from 'redux/slices/orders';

import withLoader from 'components/helper/withLoader';
import { default as SubHeader } from 'components/header';
import OrderSummary from 'components/OrderSummary';
import Section from 'components/section';
import Layout from 'components/Layout';
import BankLogo from './BankLogo';
import ContentLoader from 'components/ContentLoader';
import { makePayment } from 'redux/slices/orders';
import api from 'utils/api';
import 'style/payment.scss';

const OrderDetail = withLoader(
  ({ sale_order }) => {
    return (
      <>
        <OrderSummary
          order={{
            Subtotal: sale_order.total_price_before_sst,
            SST: sale_order.sst,
            Rounding: sale_order.rounding,
            'Total Bill': sale_order.total_price,
          }}
        />
        <p className="cart-summary-link">
          <NavLink to={`/order/${sale_order.id}`}>
            &larr; Return to order details
          </NavLink>
        </p>
      </>
    );
  },
  { height: '180' }
);

const Payment = props => {
  const dispatch = useDispatch();
  const [banks, setBanks] = useState([]);
  const isOnline = useSelector(state => state.network.isOnline);
  const { sale_id } = useParams();

  let sale_order = useSelector(state => getOrder(state, parseInt(sale_id)));
  const isPaymentLoading = useSelector(state => state.orders.loading);
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    api.GET('billing/payment_methods/banks').then(response => {
      setBanks(response.data.banks);
    });
  }, []);

  useEffect(() => {
    if (isOnline) {
      dispatch(fetchOrder(sale_id));
    }
  }, [dispatch, sale_id, isOnline]);

  const handleClick = () => {
    dispatch(
      makePayment(sale_order.id, {
        payment_method: {
          type: 'bank',
          code: selectedBank,
        },
      })
    ).then(redirect_url => {
      if (redirect_url) {
        window.location.replace(redirect_url);
      }
    });
  };

  const Footer = () => {
    return (
      <div className="bottom-action-bar">
        <Button
          isLoading={isPaymentLoading}
          disabled={!selectedBank}
          onClick={handleClick}
        >
          Pay {sale_order && sale_order.total_price}
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
        <OrderDetail isLoading={!sale_order} sale_order={sale_order} />
      </Section>

      <Section header="Payment Method">
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
    </Layout>
  );
};

export default Payment;
