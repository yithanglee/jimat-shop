import { createSlice } from '@reduxjs/toolkit';

import api from 'utils/api';

const initialState = {
  outlets: [],
  favourite_outlets: {
    items: [],
    ids: [],
  },
};

const outlets = createSlice({
  name: 'outlets',
  initialState,
  reducers: {
    fetchOutletsSuccess: (state, { payload }) => {
      return {
        ...state,
        outlets: payload,
      };
    },
    fetchFavouriteOutletsSuccess: (state, { payload }) => {
      return {
        ...state,
        favourite_outlets: {
          items: payload,
          ids: payload.map(item => item.id),
        },
      };
    },
    fetchOutletsFailure: (state, { payload }) => {},
  },
});

const {
  fetchOutletsSuccess,
  fetchOutletsFailure,
  fetchFavouriteOutletsSuccess,
} = outlets.actions;

export const fetchOutlets = (barcode_id, location) => async dispatch => {
  const url = barcode_id ? `search/outlets/stocks/${barcode_id}` : 'outlets';
  try {
    const resp = await api.GET(`/${url}?city=${location}`);
    dispatch(fetchOutletsSuccess(resp.data.items));
  } catch (e) {
    console.error(e);
    dispatch(fetchOutletsFailure(e));
  }
};

export const fetchFavouriteOutlets = () => async dispatch => {
  try {
    // debugger;
    // if (!accessToken) throw Error('User not found');
    const resp = await api.GET('user_profile/favourite_outlets');
    dispatch(fetchFavouriteOutletsSuccess(resp.data.items));
  } catch (e) {
    dispatch(fetchOutletsFailure(e));
  }
};

export default outlets.reducer;
