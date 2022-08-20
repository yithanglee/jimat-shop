import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { calculateCarts } from 'redux/slices/carts';

const cartsQuantity = createSelector(
  state => state.carts,
  carts => carts.allIds.map(id => carts.byId[id].quantity)
);

const CartSummary = ({ ready_to_pay, membership_verified, handleCreditToggle }) => {
  const dispatch = useDispatch();
  const [is_credit_used, toggle_credit] = useState(false);
  const carts = useSelector(cartsQuantity, shallowEqual);
  const outletId = useSelector(state => state.carts.cartOutlet);
  const credit_enabled_outlet = useSelector(
    state => state.auth.user.credit_enabled_outlet
  );
  const cartSummary = useSelector(state => {
    return state.carts.cartSummary;
  });

  useEffect(() => {
    dispatch(calculateCarts(is_credit_used, membership_verified));
  }, [dispatch, carts, is_credit_used, membership_verified]);

  const handleCheckbox = e => {
    toggle_credit(e.target.checked);
    handleCreditToggle(e.target.checked);
  };

  return (
    <div className="p-4 shadow rounded">
      {ready_to_pay && (
        <div className="justify-between items-center flex p-2 border border-dashed rounded mb-2">
          <label
            htmlFor="pay_with_credit"
            className="block leading-tight text-gray-900"
          >
            {!membership_verified
              ?  <span className="text-sm font-bold text-red-600">Verify now to use voucher</span>
              : <span className="text-sm font-bold">Pay with JiMAT Voucher</span>
            }
            
            <p className="block text-sm font-bold text-blue-600 pt-2 pb-1">
              {credit_enabled_outlet[outletId]} Available
            </p>
            {!membership_verified && <span className="text-xs text-gray-500 text-normal">Please check your email for verification</span>}
          </label>
          <input
            id="pay_with_credit"
            type="checkbox"
            disabled={!membership_verified}
            onChange={handleCheckbox}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
        </div>
      )}

      <div className="justify-between items-center flex pb-1">
        <span className="text-gray-500 text-sm ">Subtotal</span>
        <span className="text-black text-base font-medium tracking-tight">
          {cartSummary.total_price}
        </span>
      </div>
      <div className="justify-between items-center flex py-1">
        <span className="text-gray-500 text-sm ">SST</span>
        <span className="text-black text-base font-medium tracking-tight">
          {cartSummary.sst}
        </span>
      </div>
      {is_credit_used && (
        <div className="justify-between items-center flex py-1 pb-2">
          <span className="text-gray-500 text-sm ">Credit Used</span>
          <span className="text-blue-600 text-base font-medium subpixel-antialiased tracking-tight">
            - {cartSummary.credit}
          </span>
        </div>
      )}

      <div className="justify-between items-center flex pt-2 border-t-2 border-dashed">
        <span className="text-black text-sm ">Total Amount</span>
        <span className="text-black text-lg font-bold tracking-tight">
          {cartSummary.net_price}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
