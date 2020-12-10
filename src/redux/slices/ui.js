import { createSlice } from '@reduxjs/toolkit';

const ui = createSlice({
  name: 'ui',
  initialState: {
    showSidebar: false,
  },
  reducers: {
    toggleSidebar: state => {
      return {
        showSidebar: !state.showSidebar,
      };
    },
    hideSidebar: () => {
      return {
        showSidebar: false,
      };
    },
  },
});

export const { toggleSidebar, hideSidebar } = ui.actions;
export default ui.reducer;
