import { createSlice } from '@reduxjs/toolkit';

import api from 'utils/api';

const initialState = {
  selectedLocation: 'Petaling Jaya',
  selectedState: 'Selangor',
  locations: [],
};

const location = createSlice({
  name: 'location',
  initialState,
  reducers: {
    selectLocation: (state, { payload }) => {
      return {
        ...state,
        selectedLocation: payload.city,
        selectedState: payload.state,
      };
    },
    fetchLocationsSuccess: (state, { payload }) => {
      return {
        ...state,
        locations: payload,
      };
    },
    fetchLocationFailure: (state, { payload }) => {},
  },
});

const { fetchLocationFailure, fetchLocationsSuccess } = location.actions;

export const fetchLocations = () => async dispatch => {
  try {
    const resp = await api.GET('/locations');
    dispatch(fetchLocationsSuccess(resp.data.items));
  } catch (e) {
    console.error(e);
    dispatch(fetchLocationFailure());
  }
};

export const { selectLocation } = location.actions;
export default location.reducer;
