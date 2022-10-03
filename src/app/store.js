import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../features/countries/countriesSlice';
import favsSliceReducer from '../features/countries/favsSlice';

export default configureStore({
  reducer: {
    countries: countriesReducer,
    favorites: favsSliceReducer,
  },
});