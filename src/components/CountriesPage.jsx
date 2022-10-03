import React, { useEffect } from 'react';
import CountryCard from "./CountryCard";
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries, search } from '../features/countries/countriesSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import style from "./CountriesPage.module.css"
import ScrollToTop from './backToTop';

const CountriesPage = () => {
    const dispatch = useDispatch();

    const countriesList = useSelector(state => state.countries.countriesList);
    const loading = useSelector(state => state.countries.isLoading);
    const searchInput = useSelector(state => state.countries.search);

    useEffect(() => {
        dispatch(initializeCountries());
    }, [dispatch]);

    // conditional rendering
    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
                <span>Loading...</span>
            </Box>
        )

    }
    return (
        <main>
            <div className={style.sort_container}>
                <form className={style.search_form}>
                    <input type="search" className={style.search_bar}
                        placeholder="Search for Countries"
                        onChange={(e) => dispatch(search(e.target.value))}
                    />
                </form>
            </div>

            <div className={style.country_list}>
                {countriesList
                    .filter(c =>
                        c.name.common.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .map(country => (
                            <CountryCard  key={country.name.common} country={country} countries={countriesList} />
                    ))}
            </div>
            <ScrollToTop/>
        </main>
    );
};
export default CountriesPage;
