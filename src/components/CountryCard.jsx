import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
// import Checkbox from "@mui/material/Checkbox";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import style from "./CountryCard.module.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../features/countries/favsSlice';


const CountryCard = ({ country}) => {
  // const { name, languages, flags, population } = country;
  const favsList = useSelector(state => state.favorites.favoritesList);
  // const countries = useSelector(state => state.countries.countriesList);
  const { name, languages, flags, population } = country;
  const dispatch = useDispatch();

  // const updateBookmark = (event) => {
  //   onClickBookmark(name.common);
  // };

  const addToFavs = country => {
    dispatch(addToFavorites(country));
    // Set localStorage to favsList and new country
    localStorage.setItem('favorites', JSON.stringify([...favsList, country]));
  };

  const removeFromFavs = country => {
    dispatch(removeFromFavorites(country));
    // Filter out country and set localStorage
    const filteredFavs = JSON.parse(localStorage.getItem('favorites')).filter(
      c => c.name.common !== country.name.common
    );
    localStorage.setItem('favorites', JSON.stringify([...filteredFavs]));
  };

  const checkIfInFavs = () => {
    const arr = favsList.filter(c => c.name.common === country.name.common);

    return arr.length > 0;
  };


  return (
    <>
      <Card sx={{ maxWidth: 450, minHeight: 420 }}>
        <Link
          to={`/countries/${name.common}`}
          state={{ country: country }}
          className={style.card_link}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={flags.svg}
              alt={name.common}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h5>{name.common}</h5>
                <h6>{name.official}</h6>
              </Typography>
              <Typography variant="div" color="text.secondary">
                <div className={style.country_info_container}>
                  <div className={style.info_title}>
                    <h4>
                      <span>
                        <FaLanguage />
                      </span>
                      LANGUAGE
                    </h4>

                    <ul>
                      {Object.values(languages || {}).map((language) => (
                        <li key={language}>{language}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={style.info_title}>
                    <h4>
                      <span>
                        <FaMoneyBillWave />
                      </span>
                      CURRENCY
                    </h4>
                    <ul>
                      {Object.values(country?.currencies || {}).map(
                        (currency, i) => (
                          <li key={i}>{currency.name}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className={style.info_title}>
                    <h4>
                      <span>
                        <FaUsers />
                      </span>
                      POPULATION
                    </h4>
                    <p> {population.toLocaleString()}</p>
                  </div>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Link to={`/countries/${name.common}`} state={{ country: country }}>
            <Button size="small" color="primary">
              See More
            </Button>
          </Link>
          {/* {showHeart && (
            <Checkbox
              checked={isBookmarked}
              aria-label="add to Bookmarks"
              onChange={updateBookmark}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
            />
          )} */}
          {checkIfInFavs() ? (
        <IconButton
          onClick={() => removeFromFavs(country)}
          sx={{ position: 'absolute', bottom: '0', zindex: '4' }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => addToFavs(country)}
          sx={{ position: 'absolute', bottom: '0', zindex: '3' }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
        </CardActions>
      </Card>
    </>
  );
}


export default CountryCard;
