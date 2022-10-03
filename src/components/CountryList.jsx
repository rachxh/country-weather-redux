import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import Search from "./Search";
import style from "./CountryList.module.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState([]);
    const [bookmarkArray, setBookmarkArray] = useState([])
    
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => {
                localStorage.setItem("countryArray", JSON.stringify(res.data));
                
                let bookmarkArrayJson = window.localStorage.getItem("bookmarkArray");

                if (bookmarkArrayJson === null)
                    setBookmarkArray([]);
                else
                    setBookmarkArray(JSON.parse(bookmarkArrayJson));

                setCountries(res.data);
                setLoading(false);
                setSort(res.data);
            })
            .catch((error) => {
                setLoading(true);
                console.error();
            });
    }, []);

    // conditional rendering
    if (loading) {
        return (
       <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        <span>Loading...</span>
      </Box>
        )
       
    }

    const handleSearch = (searchValue) => {
        setSearch(searchValue);
    };
    const handleClearSearch = ()=>{
        setSearch()
    }

    const handleSort = (e) => {
        const sort = [...countries];
        switch (e.target.value) {
            case "AToZ":
                setSort(
                    sort.sort((countryA, countryB) =>
                        countryA.name.common > countryB.name.common ? 1 : -1
                    )
                );
                break;
            case "ZToA":
                setSort(
                    sort.sort((countryA, countryB) =>
                        countryA.name.common > countryB.name.common ? -1 : 1
                    )
                );
                break;
            default:
                // Empty the sort and show original order.
                setSort(sort);
                break;
        }
    };

    const addBookmark = (bookmarkCountryName) => {
        let index = bookmarkArray.findIndex(
            (countryName) => countryName === bookmarkCountryName
        );

        if (index === -1) {
            // countryName is not a bookmark yet! Add it to the bookmarks.
            bookmarkArray.push(bookmarkCountryName);
        } else {
            // countryName is already a bookmark! Remove it from the bookmarks.
            bookmarkArray.splice(index, 1);
        }
            //The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
        setBookmarkArray([...bookmarkArray]);
        window.localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray));
    };

    const checkIsBookmark = (CountryName) => {
        // Check if bookmarkArray exists. If not create an empty array.
        if (bookmarkArray === null)
            return false;

        let index = bookmarkArray.findIndex(
            (bookmarkedCountryName) => bookmarkedCountryName === CountryName
        );

        return (index>=0)
    };

    return (
        <main>
            <div className={style.sort_container}>
                <Search onSearch={handleSearch} onClear={handleClearSearch}/>
                <select onChange={handleSort} className={style.sort}>
                    <option>Sort</option>
                    <option value="AToZ">A-Z</option>
                    <option value="ZToA">Z-A</option>
                </select>
            </div>

            <div className={style.country_list}>
                {sort
                    .filter((country) =>
                        country.name.common.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((country) => (
                        <CountryCard
                            key={country.name.common}
                            country={country}
                            onClickBookmark={addBookmark}
                            showHeart={true}
                            isBookmarked={checkIsBookmark(country.name.common)}
                        />
                    ))}
            </div>
        </main>
    );
};

export default CountryList;
