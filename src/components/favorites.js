import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from './header';
import '../App.scss';
import useFetch from '../util/useFetch';
import Favorite from './favorite';
import useFavorites from '../util/useFavorites';
import LoadingScreen from './loadingScreen';

export default function Favorites() {
    const weather = useSelector(state => state.weather);
    // console.log(weather);
    const [favorites, setFavorites] = useState([]);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [error, setError] = useState(false);
    const {favoriteList, favoriteListError} = useFavorites(favorites);

    useEffect(() => {
        if (favoriteList.length < 1) {
            if (loadingScreen) {
                setTimeout(() => {
                    document.querySelector('.loading-screen').classList.add('done');
                    setTimeout(() => {
                        setLoadingScreen(false);
                    }, 500)
                }, 800)
            }
        }
        if (window.localStorage.favorites) {
            setFavorites(JSON.parse(window.localStorage.favorites));
        }
        if (favoriteListError) {
            setError(true);
        }
    }, [favoriteListError])
    return (
        <div className='favorites'>
            {loadingScreen ? <LoadingScreen /> : ''}
            <Header location='Favorites' />
            <div className='favorite-cards'>
                {favoriteList.map((favorite, index) => {
                    return <Favorite 
                        key={index}
                        city={favorite.city}
                        temperature={weather.metric ? favorite.currentTemp.c : favorite.currentTemp.f}
                        unit={weather.metric ? ' C' : ' F'}
                        weatherTitle={favorite.title}
                        cityID={favorite.cityID}
                    />
                })}
            </div>
            {favoriteList.length < 1 && !error ? 
                <div className='empty'>
                    <h1>No Favorites</h1>
                </div>
            : ''}
            {error ? 
                <div className='error'>
                    <h1>An error has occoured</h1>
                    <h2>Please Try Again</h2>
                </div>
            : ''}
        </div>
    )
}
