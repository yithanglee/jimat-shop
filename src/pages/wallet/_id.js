import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';
import { default as SubHeader } from 'components/header';
import { fetchUserCreditByID } from 'redux/slices/auth';
import Layout from 'components/Layout';
import Section from 'components/section';
const EmptyState = props => {
  return (
    <div className="empty-state">
      <p>{props.text}</p>
    </div>
  );
};

const Transaction = ({ amount, date, name, type, sales_order }) => {
  const color = type === 'in' ? 'green' : 'red';
  let uri = window.location.pathname + window.location.search;
  let hasLink = false

  if (name.match(/Order/)) {
    const sub = name.substr(name.indexOf("#") + 1, name.length + 1)
    const sid = sales_order ? sales_order : sub;
    uri = `/order/${sid}`
    hasLink = true
  }

  return (
    <NavLink
      exact
      className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
      to={uri}
    >
      <div className="flex justify-between align-items px-4 py-4 sm:px-6">
        <div className="pr-4 ">
          <p className="text-md font-bold leading-5 mb-1">{name}</p>
          <p className="text-xs leading-5 text-gray-400">
            <time>{moment(date).format('LL - LT')}</time>
          </p>
        </div>
        <div className={`flex flex-col items-end justify-end`}>
          <p className={`flex-shrink-0 text-sm leading-5 text-${color}-400 font-bold`}>
            {amount}
          </p>
          {hasLink && <p className="text-xs text-blue-600">View Sales Order</p>}
        </div>
      </div>
    </NavLink>
  );
};

const Order = props => {
  const { id } = useParams();
  const params = queryString.parse(props.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserCreditByID(id));
  }, [dispatch, id]);
  const credits = useSelector(state => {
    return state.auth.user.credits;
  });
  const balance = credits.length && credits[0].after_amount;

  return (
    <Layout>
      <SubHeader transparent />
      <Section padding="horizontal">
        <div className="rounded-lg shadow-lg overflow-hidden max-w-lg">
          <div className={`px-4 py-4 bg-indigo-600 h-full`}>
            <p className="text-md font-semibold text-white">{params.name}</p>
            <p className="text-lg font-bold text-white mb-3">{params.outlet}</p>
            <div className="text-right">
              <p className={`text-md font-medium text-white`}>
                Credits Balance
              </p>
              <p className="text-2xl leading-none font-extrabold text-white">
                {!!balance ? balance : 'RM 0.00'}
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section padding="vertical">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul>
            {credits &&
              credits.map((credit, index) => {
                return (
                  <li className="border-t border-gray-200" key={index}>
                    <Transaction
                      amount={credit.amount}
                      date={credit.updated_at}
                      name={credit.title}
                      type={credit.event}
                      sales_order={credit.sales_order}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        {!credits.length && <EmptyState text="No Transaction found" />}
      </Section>
    </Layout>
  );
};

export default Order;
