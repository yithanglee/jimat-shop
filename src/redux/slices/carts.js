import { createSlice, combineReducers } from '@reduxjs/toolkit';

import Storage from 'utils/storage';
import api from 'utils/api';

const initialState = {};

const byId = createSlice({
  name: 'byId',
  initialState,
  reducers: {
    setInitialCarts: (state, { payload }) => {
      payload.forEach(each => {
        state[each.item.barcode] = each.item;
      });
    },
    addToCart: (state, { payload }) => {
      if (state[payload.item.barcode]) {
        state[payload.item.barcode].quantity += 1;
      } else {
        state[payload.item.barcode] = {
          ...payload.item,
          quantity: 1,
        };
      }
    },
    removeFromCart: (state, { payload }) => {
      if (payload.shouldBeRemoved) {
        delete state[payload.barcode];
      } else {
        state[payload.barcode].quantity -= 1;
      }
    },
    clearCart: () => {
      return {};
    },
  },
});

const allIds = createSlice({
  name: 'allIds',
  initialState: [],
  extraReducers: {
    [byId.actions.setInitialCarts]: (state, { payload }) => {
      return payload.map(each => each.item.barcode);
    },
    [byId.actions.addToCart]: (state, { payload }) => {
      if (state.indexOf(payload.item.barcode) === -1) {
        state.push(payload.item.barcode);
      }
    },
    [byId.actions.removeFromCart]: (state, { payload }) => {
      if (payload.shouldBeRemoved) {
        const newState = state.filter(each => each !== payload.barcode);
        return newState;
      }
    },
    [byId.actions.clearCart]: () => {
      return [];
    },
  },
});

const cartOutlet = createSlice({
  name: 'cartOutlet',
  initialState: '',
  extraReducers: {
    [byId.actions.setInitialCarts]: (state, { payload }) => {
      return payload[0].item.outletId;
    },
    [byId.actions.addToCart]: (state, { payload }) => {
      return payload.item.outletId;
    },
    [byId.actions.clearCart]: () => {
      return '';
    },
  },
});

const cartSummary = createSlice({
  name: 'cartSummary',
  initialState: {
    total_price: '0.00',
    sst: '0.00',
    net_price: '0.00',
  },
  reducers: {
    calculateCartsSuccess: (state, { payload }) => {
      return { ...state, ...payload.order_summary };
    },
    calculateCartsFailure: (_state, _action) => {},
    clearSummary: (_state, _action) => {
      return {
        total_price: '0.00',
        sst: '0.00',
        net_price: '0.00',
      };
    },
  },
  extraReducers: {
    [byId.actions.setInitialCarts]: (state, { payload }) => {
      return payload ? { ...state, ...payload.cartSummary } : {};
    },
    [byId.actions.clearCart]: () => {
      return {};
    },
  },
});

export const { setInitialCarts } = byId.actions;

const {
  calculateCartsSuccess,
  calculateCartsFailure,
  clearSummary,
} = cartSummary.actions;

export const addItemToCart = payload => (dispatch, getState) => {
  dispatch(
    byId.actions.addToCart({
      item: { ...payload.item, outletId: payload.outletId },
    })
  );
  const state = getState();
  Storage.carts.setItem(
    payload.item.barcode,
    state.carts.byId[payload.item.barcode]
  );
};

export const removeItemFromCart = payload => (dispatch, getState) => {
  let state = getState();
  dispatch(
    byId.actions.removeFromCart({
      ...payload,
      shouldBeRemoved: state.carts.byId[payload.barcode].quantity === 1,
    })
  );
  state = getState();
  Storage.carts.setItem(payload.barcode, state.carts.byId[payload.barcode]);
};

export const clearCart = () => dispatch => {
  dispatch(byId.actions.clearCart());
  Storage.carts
    .clear()
    .then(() => {
      console.log('the carts is cleared');
    })
    .catch(e => {
      console.error(e);
    });
};

export const calculateCarts = is_credit_used => async (dispatch, getState) => {
  try {
    const state = getState();
    const outletId = state.carts.cartOutlet;

    if (state.carts.allIds.length > 0) {
      const carts = state.carts.allIds.map(id => ({
        barcode: id,
        quantity: state.carts.byId[id].quantity,
      }));
      const body = {
        line_items: carts,
        is_credit_used: is_credit_used,
      };
      const resp = await api.PUT(`/outlets/${outletId}/calculate`, body);
      dispatch(calculateCartsSuccess(resp.data.data));
    } else {
      dispatch(clearSummary());
    }
  } catch (e) {
    console.error(e);
    dispatch(calculateCartsFailure(e));
  }
};

export const getAllCartItems = state =>
  state.carts.allIds.map(id => state.carts.byId[id]);

export const getCartsValue = state =>
  state.carts.allIds.map(id => state.carts.byId[id].quantity);

const carts = combineReducers({
  byId: byId.reducer,
  allIds: allIds.reducer,
  cartOutlet: cartOutlet.reducer,
  cartSummary: cartSummary.reducer,
});
export default carts;
