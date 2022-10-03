import { createSlice } from '@reduxjs/toolkit';
import countryService from '../../services/countries';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countriesList: [],
    isLoading: false,
    search: '',
  },
  reducers: {
    getCountries(state, action) {
      state.countriesList = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
  },
});

//Initialize state
export const initializeCountries = () => {
  return async dispatch => {
    const countries = await countryService.getAll();
    dispatch(getCountries(countries));
    dispatch(isLoading(false));
  };
};

export const { getCountries, isLoading, search } = countriesSlice.actions;
export const selectCountriesList = state => state['countries'].countriesList;

export default countriesSlice.reducer;