import React from 'react';
import style from "./Search.module.css"


const Search = (props) => {

    const updateSearch = (e) => {
        props.onSearch(e.target.value);
    }


    return (
        <div >
            <form className={style.search_form}>
                <input type="search" className={style.search_bar}
                    placeholder="Search for Countries"
                    onChange={updateSearch}
                />

            </form>

        </div>
    );
};

export default Search;