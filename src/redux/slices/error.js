import { createSlice } from '@reduxjs/toolkit';

const error = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    catchErrorSuccess: (state, { payload }) => {
      return {
        ...payload,
      };
    },
    clearError: () => {
      return null;
    },
  },
});

export const { catchErrorSuccess, clearError } = error.actions;

export const catchError = error => {
  return async dispatch => {
    dispatch(catchErrorSuccess(error));
    setTimeout(() => {
      dispatch(clearError());
    }, 3000);
  };
};

export default error.reducer;
