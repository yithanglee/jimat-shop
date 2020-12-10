import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    fetchSearchTarget: (state, { payload }) => {
      return payload;
    },
    clearSearchTarget: (state, action) => {
      return '';
    },
  },
});

export const { fetchSearchTarget, clearSearchTarget } = search.actions;
export default search.reducer;
