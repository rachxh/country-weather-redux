import React from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { FcGallery } from "react-icons/fc";
import { FcLandscape } from "react-icons/fc";
import { FcGlobe } from "react-icons/fc";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./CountrySingle.module.css";
import { Link } from 'react-router-dom';
import style from "./CountrySingle.module.css"
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const CountrySingle = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState("");
  const API_key = process.env.REACT_APP_OPENWEATHER_KEY;
  const countryInfo = location.state.country;
  const countryName = countryInfo.name.common;
  const lat = countryInfo.latlng[0];
  const lon = countryInfo.latlng[1];
  const linkStyle = {
    textDecoration: "none",
    color: "white"
  }

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
      )
      .then((res) => {

        setWeather(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err)
      });

  }, []);

  if (loading) {
    return (

      <Box sx={{ width: '100%' }}>
        <span>Loading...</span>
        <LinearProgress />
      </Box>
    )

  }
  const hasBorder = countryInfo.borders

  return (
    <>
      <div className={styles.container}>
        <Card sx={{ maxWidth: 550 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ maxWidth: 100 }}
              image={countryInfo.coatOfArms.svg}
              alt={countryName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h2>{countryName} <span><img src={countryInfo.flags.svg} alt={countryName} width="30px" /></span></h2>
                <h6>Capital: {countryInfo.capital[0]}</h6>
              </Typography>
              {/* <Typography variant="p" color="text.secondary"> */}
              <p>
                Right now temperature it is <strong> {weather.list[0].main.temp}°C</strong> and weather condition is <strong>{weather.list[0].weather[0].description}</strong> in <strong>{countryInfo.capital[0]}</strong>
              </p>
              <img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt="weather state" />
              {/* </Typography> */}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <h2>
              <FcGallery />
            </h2>
            <span><a href={countryInfo.maps.googleMaps}>Country map</a></span>
          </CardActions>
          <CardActions>
            <h2>
              <FcGlobe />
            </h2>
            <h4>Timezone: <span>{countryInfo.timezones[0]}</span></h4>
          </CardActions>
          <CardActions>
            <h2>
              <FcLandscape />
            </h2>
            <h4>Borders: </h4>
            <span>{hasBorder ? countryInfo.borders.map((border) => (
              <li key={border}>{border}</li>
            ))
              : 'No border data'}</span>
          </CardActions>
          <CardActions>
            <button className={style.btn}>
              <Link to="/countries" style={linkStyle}>Go back</Link>
            </button>
          </CardActions>
        </Card>
        <div className="map">

        </div>
      </div>
    </>
  );
};

export default CountrySingle;
