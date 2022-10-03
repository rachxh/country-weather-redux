// import React, {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { initializeCountries, search } from '../features/countries/countriesSlice';
// import CountryCard from "./CountryCard";
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import style from "./CountriesPage.module.css"

// const CountriesPage = () => {
//     const dispatch = useDispatch;

//     const countriesList = useSelector(state => state.countries.countriesList);
//     const loading = useSelector(state => state.countries.isLoading);
//     const searchInput = useSelector(state => state.countries.search);
//     // const sortCase= useSelector((state)=>state.countries.sort)

//     useEffect(() => {
//         dispatch(initializeCountries());
//       }, [dispatch]);

//   // conditional rendering
//     if (loading) {
//         return (
//        <Box sx={{ display: 'flex' }}>
//         <CircularProgress />
//         <span>Loading...</span>
//       </Box>
//         )
       
//     }

//     // const handleSort = (e) => {
//     //     const sort = [...countriesList];
//     //     switch (e.target.value) {
//     //         case "AToZ":
//     //              sortCase(
//     //                 sort.sort((countryA, countryB) =>
//     //                     countryA.name.common > countryB.name.common ? 1 : -1
//     //                 )
//     //             );
//     //             break;
//     //         case "ZToA":
//     //             sortCase(
//     //                 sort.sort((countryA, countryB) =>
//     //                     countryA.name.common > countryB.name.common ? -1 : 1
//     //                 )
//     //             );
//     //             break;
//     //         default:
//     //             // Empty the sort and show original order.
//     //             sortCase(sort);
//     //             break;
//     //     }
//     // };

// return(
//     <>
//     <div >
//             <form className={style.search_form}>
//                 <input type="search" className={style.search_bar}
//                     placeholder="Search for Countries"
//                     onChange={(e)=>dispatch(search(e.target.value))}
//                 />
//             </form>
//         </div>
       
//         {/* <div className={style.sort_container}>
//                 <select onChange={handleSort} className={style.sort}>
//                     <option>Sort</option>
//                     <option value="AToZ">A-Z</option>
//                     <option value="ZToA">Z-A</option>
//                 </select>
//             </div> */}

//         <div className={style.country_list}>
//                 {countriesList
//                     .filter((country) =>
//                         country.name.common.toLowerCase().includes(searchInput.toLowerCase())
//                     )
//                     .map((country) => (
//                         <CountryCard
//                             key={country.name.common}
//                             country={country}
//                             // onClickBookmark={addBookmark}
//                             // showHeart={true}
//                             // isBookmarked={checkIsBookmark(country.name.common)}
//                         />
//                     ))}
//             </div>
//     </>
// )

// }

// export default CountriesPage

import React, { useEffect } from 'react';
import CountryCard from "./CountryCard";
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries,search } from '../features/countries/countriesSlice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import style from "./CountriesPage.module.css"

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
        <div>
         <form className={style.search_form}>
                <input type="search" className={style.search_bar}
                    placeholder="Search for Countries"
                   onChange={(e)=>dispatch(search(e.target.value))}
                />
            </form>
        </div>

<div className={style.country_list}>
      {countriesList
        .filter(c =>
          c.name.common.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(country => (
          <Grid item xs={2} sm={4} md={4} key={country.name.common}>
            <CountryCard country={country} countries={countriesList} />
          </Grid>
        ))}
      <IconButton onClick={() => window.scrollTo(0, 0)}>
        <ArrowUpwardIcon
          sx={{
            position: 'fixed',
            zIndex: '10',
            color: 'red',
            backgroundColor: 'white',
            borderRadius: '50%',
            top: '60vh',
            right: '0',
            fontSize: '4rem',
            padding: '0.5rem',
          }}
        />
      </IconButton>
    </div>
    </main>
  );
};
export default CountriesPage;
