import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnline: true,
};

const network = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setOnline: (state, action) => {
      state.isOnline = true;
    },
    setOffline: (state, action) => {
      state.isOnline = false;
    },
  },
});

export const { setOnline, setOffline } = network.actions;

export default network.reducer;
