import React, {useState} from 'react'
import {Switch, Button, IconButton} from '@material-ui/core';
import DarkMode from '@material-ui/icons/Brightness3';
import LightMode from '@material-ui/icons/BrightnessHigh';import {useSelector, useDispatch} from 'react-redux';
import {changeWeather} from '../actions'

export default function Header(props) {
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();
    const [imperial, setImperial] = useState(false)
    const switchChange = () => {
        setImperial(!imperial);
        let weatherObject = {...weather};
        weatherObject.metric = imperial;
        dispatch(changeWeather(weatherObject));
    }
    return (
        <div className='header'>
            <a className='logo' href='/'>
                <img alt='logo' src='logo.svg' />
                <h2>Weather App</h2>
            </a>
            <div className='buttons'>
                <div className='toggles'>
                    <div className='temperature'>
                        <span>C</span>
                        <Switch checked={imperial} color='primary' onChange={switchChange} />
                        <span>F</span>
                    </div>
                    <div className='dark-light'>
                        <IconButton>
                            <DarkMode />
                        </IconButton>
                    </div>
                </div>
                <div className='links'>
                    <a href='/'>
                        <Button classes={{label: 'label'}} color='primary' variant={props.location === 'Home' ? 'contained' : 'text'}>Home</Button>
                    </a>
                    <a href='/favorites'>
                        <Button classes={{label: 'label'}} color='primary' variant={props.location === 'Favorites' ? 'contained' : 'text'}>Favorites</Button>
                    </a>
                </div>
            </div>
        </div>
    )
}
