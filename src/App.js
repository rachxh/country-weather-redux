import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import CountrySingle from "./components/CountrySingle";
import CountriesPage from "./components/CountriesPage";
import Layout from "./pages/Layout";
import Home from "./components/Home";
// import BookmarkPage from "./components/BookmarkPage";
import Favorites from './components/Favorites';

const App = () => {
  const CountryWrapper = (props) => {
    const params = useParams();
    return <CountrySingle params={params} {...props} />;
  };
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
