import { createSlice } from '@reduxjs/toolkit';

import api from 'utils/api';

const initialState = {
  loading: true,
  items: [],
};

const banner = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    fetchingBanner(state) {
      return {
        ...state,
        loading: true,
      };
    },
    fetchBannersSuccess(state, { payload }) {
      return {
        loading: false,
        items: [...payload.items],
      };
    },
    fetchBannersFailure(state, { payload }) {
      return {
        loading: false,
        items: [],
      };
    },
  },
});

export default banner.reducer;

const {
  fetchBannersSuccess,
  fetchBannersFailure,
  fetchingBanner,
} = banner.actions;

export const fetchBanners = () => async dispatch => {
  try {
    const resp = await api.GET('/banners');
    dispatch(fetchingBanner());
    dispatch(fetchBannersSuccess(resp.data));
  } catch (err) {
    console.error(err);
    dispatch(fetchBannersFailure());
  }
};
