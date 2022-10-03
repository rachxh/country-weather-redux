import React from 'react';

const Home = () => {
    return (
        <>
            <div>
                <h1 className='home_title'> Learn about countries and bookmark countries you have been to in Country-App 🌏</h1>
            </div>
            <div className='home_image_container'>
                <img className='home_img' src="https://cdn.pixabay.com/photo/2017/01/12/13/23/map-1974699__480.png" alt="world map" />
            </div>
        </>
    );
};

export default Home;