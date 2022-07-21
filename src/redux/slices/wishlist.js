import { createSlice } from '@reduxjs/toolkit';

import api from 'utils/api';

const initialState = '';

const wishlist = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    fetchWishlistSuccess: (state, { payload }) => {
      return {
        ...state,
        items: [...payload],
        ids: payload.map(item => item.item.barcode),
      };
    },
    fetchWishlistFailure: (state, { payload }) => {
      return state;
    },
  },
});

const { fetchWishlistSuccess, fetchWishlistFailure } = wishlist.actions;

export const fetchWishlist = () => async dispatch => {
  try {
    const resp = await api.GET('profile/wishlist');
    dispatch(fetchWishlistSuccess(resp.data.items));
  } catch (e) {
    console.error(e);
    dispatch(fetchWishlistFailure(e));
  }
};

export default wishlist.reducer;
