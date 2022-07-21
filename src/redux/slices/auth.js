import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { catchNotification } from './notification';

import api from 'utils/api';

const initialState = {
  accessToken: '',
  isUserLogin: false,
  isUserSkipped: false,
  loading: true,
  user: {
    google: {},
    jimat: {},
    credits: [],
    credit_enabled_outlet: {},
  },
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleOAuthSuccess(state, { payload }) {
      state.user.google = payload;
    },
    loginSuccess(state, { payload }) {
      state.isUserSkipped = false;
      state.isUserLogin = true;
      state.accessToken = payload.token;
    },
    loginFailure(state, { payload }) {
      return state;
    },
    logoutSuccess(state) {
      return { ...initialState };
    },
    logoutFailure(state) {},
    fetchingProfile(state) {
      return { ...state, loading: true };
    },
    fetchProfileSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          jimat: payload,
        },
      };
    },
    fetchCreditEnableOutlet(state, { payload }) {
      state.user.credit_enabled_outlet = payload;
    },
    fetchUserCreditSuccess(state, { payload }) {
      state.user.credits = payload;
    },
    fetchProfileFailure(state, { payload }) {},
    setAccessToken(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.isUserLogin = true;
    },
    skipAndContinue(state) {
      state.isUserSkipped = true;
      Cookies.set('isSkipped', true);
    },
  },
});

const {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  fetchCreditEnableOutlet,
  fetchProfileSuccess,
  fetchProfileFailure,
  fetchingProfile,
  fetchUserCreditSuccess,
} = auth.actions;

export const login = body => {
  return async dispatch => {
    try {
      const resp = await api.POST('/authentication', body);
      Cookies.set('accessToken', resp.data.data.token);
      Cookies.remove('isSkipped');
      dispatch(
        catchNotification({
          header: 'Login Successfully',
          message: 'Happy Day. Welcome Back.',
        })
      );
      dispatch(loginSuccess(resp.data.data));
    } catch (err) {
      dispatch(loginFailure(err));
      throw err;
    }
  };
};

export const login_with_token = params => {
  return async dispatch => {
    try {
      const resp = await api.POST('/authentication/tokenized', params);
      Cookies.set('accessToken', resp.data.data.token);
      Cookies.remove('isSkipped');
      dispatch(
        catchNotification({
          header: 'Login Successfully',
          message: 'Happy Day. Welcome Back.',
        })
      );
      dispatch(loginSuccess(resp.data.data));
    } catch (err) {
      dispatch(loginFailure(err));
      throw err;
    }
  };
};

export const logout = () => async dispatch => {
  try {
    const resp = await api.DELETE('/authentication');
    if (resp.data.data === 'success') {
      Cookies.remove('accessToken');
      Cookies.remove('isSkipped');
      dispatch(
        catchNotification({
          header: resp.data.message,
          message: 'Bye Bye. We see you again.',
        })
      );
      dispatch(logoutSuccess());
    }
  } catch (err) {
    dispatch(logoutFailure(err));
  }
};

export const fetchProfile = () => {
  return async dispatch => {
    try {
      dispatch(fetchingProfile());
      const resp = await api.GET('/profile');

      dispatch(fetchProfileSuccess(resp.data.item));
      dispatch(
        fetchCreditEnableOutlet(
          resp.data.item.memberships
            .filter(m => m.credit && m.credit.amount_cents > 0)
            .reduce(
              (obj, m) => ({ ...obj, [m.outlet_id]: m.credit.amount }),
              {}
            )
        )
      );
    } catch (e) {
      dispatch(fetchProfileFailure(e));
      Cookies.remove('accessToken');
    }
  };
};

export const fetchUserCreditByID = id => {
  return async dispatch => {
    try {
      const resp = await api.GET(`credits_histories/retailers/${id}`);
      dispatch(fetchUserCreditSuccess(resp.data.items));
    } catch (e) {
      console.log(e);
    }
  };
};

export const {
  googleOAuthSuccess,
  setAccessToken,
  skipAndContinue,
} = auth.actions;
export default auth.reducer;
