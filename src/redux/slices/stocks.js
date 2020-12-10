import { createSlice, combineReducers } from '@reduxjs/toolkit';

import { catchError } from './error';
import api from 'utils/api';

const byCategoryId = createSlice({
  name: 'byCategoryId',
  initialState: {},
  reducers: {
    fetchStocksSuccess: (state, { payload }) => {
      state[payload.id] = payload.stocks;
    },
  },
});

const hotItems = createSlice({
  name: 'hotItems',
  initialState: [],
  reducers: {
    fetchHotItemsSuccess: (state, { payload }) => {
      return [...payload];
    },
    fetchHotItemsFailure: (state, { payload }) => {
      return state;
    },
  },
});

const { fetchStocksSuccess, fetchStocksFailure } = byCategoryId.actions;
const { fetchHotItemsSuccess, fetchHotItemsFailure } = hotItems.actions;

export const fetchStocksBySupplier = (id, supplierId) => async dispatch => {
  try {
    const response = await api.GET(
      `outlets/${id}/suppliers/${supplierId}/stocks`
    );
    const payload = {
      id: supplierId,
      stocks: response.data.items,
    };
    dispatch(fetchStocksSuccess(payload));
  } catch (e) {
    dispatch(
      catchError({
        message: 'We cant show you anything now.',
        header: '404! Something is wrong',
      })
    );
    dispatch(fetchStocksFailure(e));
  }
};

export const fetchHotItems = () => async dispatch => {
  try {
    const resp = await api.GET('search?tag=hot');
    dispatch(fetchHotItemsSuccess(resp.data.items));
  } catch (e) {
    dispatch(
      catchError({
        message: 'We cant show you anything now.',
        header: '404! Something is wrong',
      })
    );
    dispatch(fetchHotItemsFailure(e));
  }
};

export const getStocksBySupplier = (state, id) => state.stocks.byCategoryId[id];

const stocks = combineReducers({
  byCategoryId: byCategoryId.reducer,
  hotItems: hotItems.reducer,
});
export default stocks;
