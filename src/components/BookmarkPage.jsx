import React from "react";
import CountryCard from './CountryCard';
import style from "./BookmarkPage.module.css"

const BookmarkPage = () => {
    const countryArrayJson = window.localStorage.getItem("countryArray");
    const countryArray = (countryArrayJson === null) ? [] : JSON.parse(countryArrayJson);
    
    const bookmarkArrayJson = window.localStorage.getItem("bookmarkArray")
    // Check if bookmarkArray exists. If not create an empty array.
    const bookmarkArray = (bookmarkArrayJson === null) ? [] : JSON.parse(bookmarkArrayJson);

    const bookmarkCountryArray = [];

    bookmarkArray.forEach((bookmark) => {
        const country = countryArray.find((country) => country.name.common === bookmark);

        if (country !== null) {
            bookmarkCountryArray.push(country);
        }
    })
    

    return (
        <div>
            <h1 className={style.page_title}>Countries I have been to...📍</h1>
            <div className={style.country_list}>
            {bookmarkCountryArray.map((country) => (
                <CountryCard
                    key={country.name.common}
                    country={country}         
                />
            ))}
            </div>
        </div>
    );
};

export default BookmarkPage;