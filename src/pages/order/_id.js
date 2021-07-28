import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import withLoader from 'components/helper/withLoader';
import { getOrder, fetchOrder } from 'redux/slices/orders';
import Icon from 'components/Icon';
import { default as SubHeader } from 'components/header';
import Section from 'components/section';
import Layout from 'components/Layout';
import OrderSummary from 'components/OrderSummary';
import ProductListing from 'components/ProductListing';
import Listing from 'components/Listing';
import api from 'utils/api';
import 'style/order.scss';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const InvoiceDownload = ({
  order,
  isInvoiceReadyToDownload,
  generateReport,
}) => {
  if (order && order.status === 'Paid') {
    return (
      <Section>
        <div className="invoice">
          <span>
            Receipt For
            <br />
            {`Order #${order && order.sales_order_number}`}
          </span>
          <div className="wrapper">
            {!isInvoiceReadyToDownload ? (
              <p className="font-bold color-grey-400">Fetching...</p>
            ) : (
              <p onClick={() => generateReport(order)}>Download</p>
            )}
          </div>
        </div>
      </Section>
    );
  } else {
    return null;
  }
};

const CancelOrderButton = ({ order, cancelOrder }) => {
  if (order && order.status === 'Pending payment') {
    return (
      <Section>
        <span
          onClick={() => {
            cancelOrder(order.id);
          }}
          className="inline-block bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
          Cancel this order
        </span>
      </Section>
    );
  } else {
    return null;
  }
};

const PendingPaymentNotice = ({ order }) => {
  if (order && order.status === 'Pending payment') {
    return (
      <div className="bg-gray-200 p-5 flex md:block justify-between items-center">
        <div className="content">
          <p className="text-gray-900 font-bold">Payment Pending</p>
          <p className="text-gray-900 text-sm">
            Seem Like Your Payment has failed. Please try again.
          </p>
        </div>

        <div className="action flex-shrink-0 flex-grow-0">
          <NavLink exact to={'/payment/' + order.id}>
            <span className="md:mt-2 mt-0 inline-block bg-blue-700 hover:bg-blue-500 text-white font-semibold text-white py-2 px-4 hover:border-transparent rounded">
              Pay Now
            </span>
          </NavLink>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const OrderDetail = withLoader(
  ({ order, methods }) => {
    return (
      <>
        <Section padding="none">
          <div className="list px-10">
            <div className="list-icon">
              <Icon type="outlet" size="large" viewbox="40" />
            </div>
            <div className="list-body">
              <p className="title">{order.outlet_name}</p>
              <p className="description">{order.outlet_address}</p>
            </div>
          </div>
        </Section>
        <Section>
          <OrderSummary
            order={{
              Subtotal: order.total_price,
              SST: order.sst,
              'Used Credits': order.credit_amount,
              'Total Bill': order.net_price,
            }}
          />
        </Section>
        <Section padding="vertical" header="Item List">
          {order.line_items.map(item => (
            <ProductListing
              horizontal
              readonly
              key={item.barcode}
              product={item}
              wishlist={false}
            />
          ))}
        </Section>
        <Section header="Payment Details" padding="vertical">
          <Listing divider full>
            <div className="flex justify-between py-2">
              <p className="text-sm leading-5 text-grey-700">Payment Method</p>
              <div className="flex">
              {methods && methods.map((method, idx) =>
                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 ml-2 rounded-md text-sm font-medium leading-5 bg-gray-400 text-white">
                  {method}
                </span>  
              )}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm leading-5 text-grey-700">Payment Status</p>
              {order.status === 'Paid'
                ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-green-100 text-green-800">
                  {order.status}
                </span>
                : <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-gray-100 text-gray-800">
                  {order.status}
                </span>
              }
              
            </div>
          </Listing>
          <OrderSummary
            no-header
            style={{ boxShadow: 'none' }}
            order={{
              Subtotal: order.total_price,
              SST: order.sst,
              'Used Credits': order.credit_amount,
              'Total Bill': order.net_price,
            }}
          />
        </Section>
      </>
    );
  },
  { height: '180' }
);

const Order = props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const params = useQuery();
  const isOnline = useSelector(state => state.network.isOnline);
  const credit_enabled_outlet = useSelector(
    state => state.auth.user.credit_enabled_outlet
  );
  let order = useSelector(state => getOrder(state, parseInt(id)));
  const [methods, setPaymentMethod] = useState([])
  const [invoice, setInvoice] = useState()
  const [isInvoiceReadyToDownload, updateInvoiceStatus] = useState(true);

  const generateReport = order => {
    updateInvoiceStatus(false)
    return api
      .GET(`sales_orders/${order.id}/invoice`, { responseType: 'arraybuffer' })
      .then((response) => {
        if (response.status === 200) {
          updateInvoiceStatus(true);
          setInvoice(response.data)
        }
      })
      .catch(function (error) {
        updateInvoiceStatus(false);
      });
  };

  const cancelOrder = orderId => {
    api
      .PUT(`sales_orders/${orderId}`, { status: 'cancel' })
      .then(function() {
        window.location.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const checkPaymentMethods = order => {
    if (!order) return;
    const { status, credit_used, net_price, payment_type } = order
    const type = (payment_type) ? payment_type : 'Online'
    
    switch (status) {
      case 'Paid':
      case 'Fulfilled':
      case 'Pending collection':
        switch (credit_used) {
          case true:
            const price = parseInt(net_price.replace(/RM\s+/, ''))
            let _status = (price === 0) 
              ? ['Voucher'] 
              : ['Voucher', type]
            setPaymentMethod(_status)
            break;
          default:
            setPaymentMethod([type])
        }
        break;
      default:
        setPaymentMethod(['Not Available'])
    }
  }

  useEffect(() => {
    if (params.get('billplz[paid]')) {
      return window.location.href = `/order/${id}`
    }

    if (isOnline && order) {
      const {status, payment_type} = order

      if (order && !payment_type) {
        switch (status) {
          case 'Paid':
          case 'Fulfilled':
          case 'Pending collection':
            dispatch(fetchOrder(id));
            break;
          default:
        }
      }
      updateInvoiceStatus(true);
    }
  }, [dispatch, id, isOnline, order, params]);

  useEffect(() => {
    checkPaymentMethods(order)
  }, [order])

  useEffect(() => {
    if (!invoice) return;
    const file = new Blob([invoice], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }, [invoice])

  useEffect(() => {
    checkPaymentMethods(order)
  }, [order])

  return (
    <Layout background="white">
      <SubHeader>
        <p className="header-title">Order Details</p>
        <p className="header-description">View your order status and details</p>
      </SubHeader>
      <PendingPaymentNotice order={order} />
      <OrderDetail
        isLoading={!order}
        order={order}
        methods={methods}
        credit_enabled_outlet={credit_enabled_outlet}
      />
      <InvoiceDownload
        order={order}
        isInvoiceReadyToDownload={isInvoiceReadyToDownload}
        generateReport={generateReport}
      />
      <CancelOrderButton order={order} cancelOrder={cancelOrder} />
    </Layout>
  );
};

export default Order;
