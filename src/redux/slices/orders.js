import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from './carts';
import Storage from 'utils/storage';
import api from 'utils/api';

const initialState = {
  loading: true,
  items: [],
  error: '',
};

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setInitialOrders: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        items: payload.reverse(),
      };
    },
    fetchingOrder: state => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchOrdersSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        items: [...payload],
      };
    },
    fetchOrdersFailure: (state, { payload }) => {
      return {
        ...state,
        error: payload,
      };
    },
    fetchOrderSuccess: (state, { payload }) => {
      const index = state.items.findIndex(each => each.id === payload.id);
      if (index !== -1) {
        state.items[index] = payload;
      } else {
        state.items.push(payload);
      }
    },
    fetchOrderFailure: (state, { payload }) => {},
  },
});

const {
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderSuccess,
  fetchOrderFailure,
  fetchingOrder,
} = orders.actions;

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    dispatch(fetchingOrder());
    const resp = await api.GET('/sales_orders');
    dispatch(fetchOrdersSuccess(resp.data.data.sales_orders));

    const state = getState();
    Storage.orders.clear().then(() => {
      state.orders.items.forEach(each => {
        Storage.orders.setItem(String(each.id), each);
      });
    });
  } catch (e) {
    console.error(e);
    dispatch(fetchOrdersFailure(e));
  }
};

export const fetchOrder = id => {
  return async dispatch => {
    try {
      const resp = await api.GET(`/sales_orders/${id}`);
      dispatch(fetchOrderSuccess(resp.data));
      return resp.data;
    } catch (e) {
      console.error(e);
      dispatch(fetchOrderFailure(e));
    }
  };
};

export const payOrder = (
  outletId,
  lineItems,
  paymentDetails,
  useCredit
) => {
  return async dispatch => {
    try {
      dispatch(fetchingOrder());
      const request = await api.POST(`outlets/${outletId}/checkout`, {
        ...lineItems,
        ...paymentDetails,
        is_credit_used: useCredit,
      });
      const {redirect_uri, sales_order} = request.data;
      dispatch(clearCart());
      return (redirect_uri) ? redirect_uri : `order/${sales_order.id}`;
    } catch (e) {
      console.error(e);
    }
  };
};

export const makePayment = (salesId, paymentDetails) => {
  return async () => {
    try {
      const resp = await api.POST(
        `sales_orders/${salesId}/payment`,
        paymentDetails
      );
      return resp.data.redirect_uri;
    } catch (e) {
      console.error(e);
    }
  };
};

export const getOrder = (state, id) =>
  state.orders.items.find(order => order.id === id);

export const getPickupOrders = state =>
  state.orders.items.filter(order => {
    return order.pickup_status && order.status !== 'Fulfilled';
  });

export const getPendingOrders = state =>
  state.orders.items.filter(
    order =>
      (order.status === 'Pending cash payment' ||
        order.status === 'Pending payment') &&
      order.pickup_status === false
  );

export const getPaidOrders = state =>
  state.orders.items.filter(order => {
    return order.status === 'Paid' && order.pickup_status === false;
  });

export const getCompletedOrders = state =>
  state.orders.items.filter(order =>
    ['Fulfilled', 'Cancelled'].includes(order.status)
  );

export const getOrdersOutlets = (state) => {
  const outlets = state.orders.items.map(order => order.outlet_name).sort()
  return ['All', ...new Set(outlets)]
}

export const { setInitialOrders } = orders.actions;
export default orders.reducer;
