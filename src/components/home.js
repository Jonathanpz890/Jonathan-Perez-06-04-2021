import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import '../App.scss';
import useGeolocate from '../util/useGeolocate';
import useFetch from '../util/useFetch';
import useSearch from '../util/useSearch';
import useParams from '../util/useParams';
import useAutocomplete from '../util/useAutocomplete';
import LoadingScreen from './loadingScreen';
import Header from './header';
import Day from '../components/day';
import {Autocomplete} from '@material-ui/lab';
import {TextField} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function Home() {
    const weather = useSelector(state => state.weather)
    //Refs
    const favoriteButton = useRef(null);
    const textField = useRef(null);
    const loadingScreenRef = useRef(null);
    //States
    const [autocomplete, setAutocomplete] = useState([]);
    const [search, setSearch] = useState('');
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [error, setError] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    //Weather Hooks
    const cityIDParam  = useParams();
    const {cityID, geolocateError} = useGeolocate();
    const {searchID, searchIDError} = useSearch(search);
    const {loading, fetchError} = useFetch(searchID ? searchID : cityIDParam ? cityIDParam : cityID);
    const autocompleteArray = useAutocomplete(autocomplete);

    const autocompleteTheme = createMuiTheme({
        overrides: {
            MuiAutocomplete: {
                listbox: {
                    backgroundColor: darkMode ? 'black' : 'white',
                },
                popper: {
                    backgroundColor: darkMode ? 'black' : 'white',
                },
                noOptions: {
                    backgroundColor: darkMode ? 'black' : 'white',
                }
            }
        }
    })

    useEffect(() => {
        checkForFavorite();
        detectDarkMode();
        if (!loading) {
            if (loadingScreen) {
                finishLoading();
            }
        } 
    }, [loading, cityID, darkMode, loadingScreen])

    //Error handling
    useEffect(() => {
        if (geolocateError) {
            setError(true);
        } if (fetchError) {
            setError(true);
        } if (searchIDError) {
            setError(true);
        }
    }, [geolocateError, fetchError, searchIDError])

    const finishLoading = () => {
        document.querySelector('.loading-screen').classList.add('done');
        setTimeout(() => {
            setLoadingScreen(false);
        }, 500)
    }
    const checkForFavorite = () => {
        if (!loading) {
            if (window.localStorage.favorites) {
                let favorites = JSON.parse(window.localStorage.favorites);
                if (favorites.includes(weather.cityID)) {
                    changeFavoriteButton();
                }
            }
        }
    }
    const addToFavorites = () => {
        let favorites = [];
        if (!window.localStorage.favorites) {
            favorites.push(weather.cityID);
            changeFavoriteButton();
        } else {
            favorites = JSON.parse(window.localStorage.favorites)
            if (favorites.includes(weather.cityID)) {
                const index = favorites.findIndex(favorite => {
                    return favorite === weather.cityID;
                })
                favorites.splice(index, 1);
                changeFavoriteButton('remove');
            } else {
                favorites.push(weather.cityID);
                changeFavoriteButton();
            }
        }
        window.localStorage.favorites = JSON.stringify(favorites);
    }
    const changeFavoriteButton = (remove) => {
        if (!loading) {
            if (remove === 'remove') {
                favoriteButton.current.classList.remove('short');
                setTimeout(() => {
                    favoriteButton.current.classList.remove('checked');
                }, 350)
            } else {
                if (favoriteButton.current) {
                    favoriteButton.current.classList.add('checked');
                }
                setTimeout(() => {
                    if (favoriteButton.current) {
                        favoriteButton.current.classList.add('short');
                    }
                }, 350)
            }
        }
    }
    const detectDarkMode = () => {
        if (window.localStorage.darkMode) {
            setDarkMode(JSON.parse(window.localStorage.darkMode));
        }
    }
    const autocompleteHandler = (e) => {
        setAutocomplete(e.target.value)
    }
    const searchOnChange = (e, values) => {
        setSearch(values);
    }
    return (
        <div className='home'>
            {loadingScreen ? <LoadingScreen ref={loadingScreenRef}/> : ''}
            <Header location='Home' toggleDarkMode={detectDarkMode}/>
            {error ? '' : 
                <ThemeProvider theme={autocompleteTheme}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={autocompleteArray}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} ref={textField} label="City Search" variant='outlined' onChange={autocompleteHandler}/>}
                        loading={false}
                        onChange={searchOnChange}
                        classes={{root: 'autocomplete'}}
                    />
                </ThemeProvider>
            }
            {loading ? 
                <div className='loading-panel'>
                    <h1>Loading...</h1>
                </div>
            : error ? 
                <div className='error'>
                    <h1>An error has occoured</h1>
                    <h2>Please try again</h2>
                </div>
            :
                <div className='main-panel'>
                    <div className='panel-header'>
                        <div className='temp-info'>
                            <div className='temp-picture'>
                                <img alt='' src={`https://developer.accuweather.com/sites/default/files/${weather.icon}-s.png`}></img>
                            </div>
                            <h3>
                                {weather.city}<br />
                                <span style={{fontSize: '1rem'}}>{weather.metric ? weather.currentTemp.c : weather.currentTemp.f}&#176; {weather.metric ? 'C' : 'F'}</span>
                            </h3>
                        </div>    
                        <div className='favorite-button'>
                            <button onClick={addToFavorites} ref={favoriteButton}>
                                <h3>Add To Favorites</h3>
                            </button>
                        </div>
                    </div>    
                    <div className='weather-title'>
                        <h1>{weather.title}</h1>
                    </div>
                    <div className='five-day'>
                        {weather.fiveDay.map((day, index) => {
                            return <Day 
                                key={index}
                                dayName={day.day} 
                                maxTemp={weather.metric ? day.maxTemp.c : day.maxTemp.f} 
                                minTemp={weather.metric ? day.minTemp.c : day.minTemp.f} 
                                unit={weather.metric ? 'C' : 'F'}
                            />
                        })}
                    </div>
                </div> 
            }
        </div>
    )
}
