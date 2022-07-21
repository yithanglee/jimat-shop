import React, {useState, useLayoutEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import withLoader from 'components/helper/withLoader';
import OrderListing from 'components/OrderListing';
import AuthBanner from 'components/AuthBanner';
import Section from 'components/section';
import Layout from 'components/Layout';
import SummaryData from './SummaryData';
import {
  getPickupOrders,
  getPendingOrders,
  getCompletedOrders,
  getPaidOrders,
  getOrdersOutlets,
} from 'redux/slices/orders';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Summary = withLoader(
  ({ orders }) => {
    const { allOrders, pickupOrders, pendingOrders } = orders;
    return (
      <div className="summary">
        <SummaryData active quantity={allOrders.length} header="Total Orders" />
        <SummaryData quantity={pickupOrders.length} header="Ready To Pickup" />
        <SummaryData quantity={pendingOrders.length} header="Pending Payment" />
      </div>
    );
  },
  { height: '150' }
);

const NotFound = withLoader(({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{height: '50vh'}}>
      <svg id="Flat" height="150" viewBox="0 0 512 512" width="150" xmlns="http://www.w3.org/2000/svg"><path d="m56 160v16l35.008 182.043a32 32 0 0 0 31.424 25.957h267.136a32 32 0 0 0 31.424-25.957l35.008-182.043v-16z" fill="#eb423f"/><path d="m472 176h-432a16 16 0 0 1 -16-16 16 16 0 0 1 16-16h432a16 16 0 0 1 16 16 16 16 0 0 1 -16 16z" fill="#c7312e"/><rect fill="#4f5659" height="33.941" rx="16" transform="matrix(.707 -.707 .707 .707 -119.931 142.461)" width="192.333" x="15.833" y="199.029"/><rect fill="#4f5659" height="192.333" rx="16" transform="matrix(.707 -.707 .707 .707 -35.578 346.108)" width="33.941" x="383.029" y="119.833"/><g fill="#e9eef2"><circle cx="168" cy="152" r="24"/><circle cx="344" cy="152" r="24"/><path d="m160 336a16 16 0 0 1 -16-16v-80a16 16 0 0 1 16-16 16 16 0 0 1 16 16v80a16 16 0 0 1 -16 16z"/><path d="m224 336a16 16 0 0 1 -16-16v-80a16 16 0 0 1 16-16 16 16 0 0 1 16 16v80a16 16 0 0 1 -16 16z"/><path d="m288 336a16 16 0 0 1 -16-16v-80a16 16 0 0 1 16-16 16 16 0 0 1 16 16v80a16 16 0 0 1 -16 16z"/><path d="m352 336a16 16 0 0 1 -16-16v-80a16 16 0 0 1 16-16 16 16 0 0 1 16 16v80a16 16 0 0 1 -16 16z"/></g></svg>
      <div className="text-center text-lg text-gray-400">{`No ${type} orders found for this outlet`}</div>
    </div>
  )
});

const Order = () => {
  const params = useQuery();
  const history = useHistory();
  const allOrders = useSelector(state => state.orders.items);
  const isLoading = useSelector(state => state.orders.loading);
  const pickupOrders = useSelector(state => getPickupOrders(state));
  const pendingOrders = useSelector(state => getPendingOrders(state));
  const paidOrders = useSelector(state => getPaidOrders(state));
  const outlets = useSelector(state => getOrdersOutlets(state));

  const completedOrders = useSelector(state => getCompletedOrders(state));
  const isSignIn = useSelector(state => state.auth.isUserLogin);
  const [tabIndex, setTabIndex] = useState('pending');
  const [outlet, setOutlet] = useState(null)

  const [pending, setPending] = useState([...pendingOrders]);
  const [paid, setPaid] = useState([...paidOrders]);
  const [ready, setReady] = useState([...pickupOrders]);
  const [completed, setCompleted] = useState([...completedOrders]);

  const filtered = (list, value) => {
    if (value !== 'All') {
      list = list.filter(order => 
        order.outlet_name === value
      );
    } else {
      list = list.filter(order => 
        order.outlet_name !== null
      );
    }
    return list;
  }

  const assign = (value) => {
    switch (tabIndex) {
      case 'completed':
        setCompleted(filtered(completedOrders, value));
        break;
      case 'paid':
        setPaid(filtered(paidOrders, value));
        break;
      case 'ready':
        setReady(filtered(pickupOrders, value));
        break;
      case 'pending':
        setPending(filtered(pendingOrders, value));
        break;
      default:
        setPending(filtered(pendingOrders, value));
    }
    setOutlet(value)
  }

  const handleTabClick = (value) => {
    history.push(`/orders?type=${value}`)
  }

  const handleOutletChange = (evt) => {
    const value = (evt.target) ? evt.target.value : evt;

    if (value && outlets.includes(value)) {
      assign(value)
    }
  }

  useLayoutEffect(() => {
    const type = params.get('type')
    setTabIndex((type ? type : 'pending'));
  }, [params, allOrders])


  useLayoutEffect(() => {
    if (allOrders.length && !outlet) {
      if (!pending.length && pendingOrders.length) {
        setPending([...pendingOrders]);
      }
      if (!paid.length && paidOrders.length) {
        setPaid([...paidOrders]);
      }
      if (!ready.length && pickupOrders.length) {
        setReady([...pickupOrders]);
      }
      if (!completed.length && completedOrders.length) {
        setCompleted([...completedOrders]);
      }
    };

  }, [
    outlet, 
    allOrders, 
    pendingOrders, 
    paidOrders, 
    pickupOrders, 
    completedOrders, 
    pending, 
    paid, 
    ready, 
    completed
  ])

  if (isSignIn) {
    return (
      <Layout>
        <Section klass="pt-20 md:pt-4 pb-20">
          <Summary
            isLoading={isLoading}
            orders={{ allOrders, pickupOrders, pendingOrders }}
          />
          <div className="grid grid-cols-4 text-center border rounded-md overflow-hidden bg-white">
            <div
              onClick={() => handleTabClick('pending')}
              className={clsx(`text-sm py-3 truncate cursor-pointer`, tabIndex === 'pending' ? 'text-white font-bold bg-blue-900' : 'text-gray-500 ')}>
              Pending
            </div>
            <div
              onClick={() => handleTabClick('paid')}
              className={clsx(`border-l text-sm py-3 truncate cursor-pointer`, tabIndex === 'paid' ? 'text-white font-bold bg-blue-900' : 'text-gray-500 ')}>
              Paid
            </div>
            <div
              onClick={() => handleTabClick('ready')}
              className={clsx(`border-l text-sm py-3 truncate cursor-pointer`, tabIndex === 'ready' ? 'text-white font-bold bg-blue-900' : 'text-gray-500 ')}>
              Ready
            </div>
            <div
              onClick={() => handleTabClick('completed')}
              className={clsx(`border-l text-sm py-3 truncate cursor-pointer`, tabIndex === 'completed' ? 'text-white font-bold bg-blue-900' : 'text-gray-500 ')}>
              Completed
            </div>
          </div>
          <div className="sm:col-span-2 my-3">
            <div className="mt-1 rounded-md shadow-sm">
              <select
                id="outlet"
                name="outlet"
                defaultValue={outlet}
                className="block form-input form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                onChange={(evt) => handleOutletChange(evt)}
              >
                {outlets.map((outlet, index) => {
                    return (
                      <option
                        key={index}
                        value={outlet}
                      >
                        {outlet}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          
          {tabIndex === 'pending' && (
            <div className="my-4">
              {isLoading || (
                <>
                  {pending && pending.length
                    ? <div className="order-listing">
                        {pending.map((order, index) => (
                          <OrderListing key={index} order={order} index={order.id} />
                        ))}
                      </div>
                    : <NotFound isLoading={isLoading} type={tabIndex} />
                  }
                </>
              )}
            </div>
          )}

          {tabIndex === 'ready' && (
            <div className="my-4">
              {isLoading || (
                <>
                  {ready && ready.length
                    ? <div className="order-listing">
                        {ready.map((order, index) => (
                          <OrderListing key={index} order={order} index={order.id} />
                        ))}
                      </div>
                    : <NotFound isLoading={isLoading} type={tabIndex} />
                  }
                </>
              )}
            </div>
          )}

          {tabIndex === 'paid' && (
            <div className="my-4">
              {isLoading || (
                <>
                  {paid && paid.length
                    ? <div className="order-listing">
                        {paid.map((order, index) => (
                          <OrderListing key={index} order={order} index={order.id} />
                        ))}
                      </div>
                    : <NotFound isLoading={isLoading} type={tabIndex} />
                  }
                </>
              )}
            </div>
          )}

          {tabIndex === 'completed' && (
            <div className="my-4">
              {isLoading || (
                <>
                  {completed && completed.length
                    ? <div className="order-listing">
                        {completed.map((order, index) => (
                          <OrderListing key={index} order={order} index={order.id} />
                        ))}
                      </div>
                    : <NotFound isLoading={isLoading} type={tabIndex} />
                  }
                </>
              )}
            </div>
          )}
        </Section>
      </Layout>
    );
  }
  return (
    <Layout>
      <Section>
        <AuthBanner />
      </Section>
    </Layout>
  );
};

export default Order;
