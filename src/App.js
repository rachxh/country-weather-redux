import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import CountrySingle from "./components/CountrySingle";
import CountriesPage from "./components/CountriesPage";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Favorites from './components/Favorites';
import { initializeFavorites } from './features/countries/favsSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const CountryWrapper = (props) => {
    const params = useParams();
    return <CountrySingle params={params} {...props} />;
  };
  
    useEffect(() => {
      dispatch(initializeFavorites());
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index  element={<Home />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="countries/:country" element={<CountryWrapper />} />
          <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes >
    </BrowserRouter>
  );
};


export default App;
