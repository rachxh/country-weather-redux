import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import CountryCard from './CountryCard';

const Favorites = () => {
  const favsList = useSelector(state => state.favorites.favoritesList);
  const searchInput = useSelector(state => state.countries.search);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
    >
      {favsList
        .filter(c =>
          c.name.common.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(country => (
          <Grid item xs={2} sm={4} md={4} key={country.name.common}>
            <CountryCard country={country} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Favorites;