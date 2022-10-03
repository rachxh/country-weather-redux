import { createSlice } from '@reduxjs/toolkit';

export const favsSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesList: [],
  },
  reducers: {
    setFavorites(state, action) {
      state.favoritesList = action.payload;
    },
    addToFavorites(state, action) {
      state.favoritesList = [...state.favoritesList, action.payload];
    },
    removeFromFavorites(state, action) {
      state.favoritesList = state.favoritesList.filter(
        country => country.name.common !== action.payload.name.common
      );
    },
  },
});

//Initialize state if localStorage is not empty
export const initializeFavorites = () => {
  const favsFromLocal = JSON.parse(localStorage.getItem('favorites'));
  if (favsFromLocal) {
    return setFavorites(favsFromLocal);
  }
  return setFavorites([]);
};

export const { setFavorites, addToFavorites, removeFromFavorites } =
  favsSlice.actions;
export const exportFavList = state => state['favorites'].favoritesList;

export default favsSlice.reducer;