import { createSlice } from '@reduxjs/toolkit';

const notification = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    catchNotificationSuccess: (state, { payload }) => {
      return {
        ...payload,
      };
    },
    clearNotifications: () => {
      return null;
    },
  },
});

export const {
  catchNotificationSuccess,
  clearNotifications,
} = notification.actions;

export const catchNotification = message => {
  return async dispatch => {
    dispatch(catchNotificationSuccess(message));
    setTimeout(() => {
      dispatch(clearNotifications());
    }, 3000);
  };
};

export default notification.reducer;
