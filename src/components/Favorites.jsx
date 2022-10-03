import React from 'react';
import { useSelector } from 'react-redux';
import CountryCard from './CountryCard';
import style from "./Favorites.module.css"

const Favorites = () => {
  const favsList = useSelector(state => state.favorites.favoritesList);
  const searchInput = useSelector(state => state.countries.search);
  return (
    <>
    <h1 className={style.page_title}>Countries I have been to...📍</h1>
 
       <div className={style.country_list}>
      {favsList
        .filter(c =>
          c.name.common.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(country => (
            <CountryCard  key={country.name.common} country={country} />
        ))}
        </div>
 
    </>
  );
};


export default Favorites;