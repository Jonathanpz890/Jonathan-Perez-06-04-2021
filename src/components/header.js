import React, {useState, useEffect, useRef} from 'react'
import {Switch, Button, IconButton, useTheme, useMediaQuery} from '@material-ui/core';
import DarkMode from '@material-ui/icons/Brightness3';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import LightMode from '@material-ui/icons/BrightnessHigh';import {useSelector, useDispatch} from 'react-redux';
import {changeWeather} from '../actions'

export default function Header(props) {
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();
    //Refs
    const navbar = useRef(null);
    const header = useRef(null);
    const overlay = useRef(null);
    //States
    const [imperial, setImperial] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    //Mobile Detection
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(800))

    useEffect(() => {
        detectDarkMode();
    }, [])
    useEffect(() => {
        if (darkMode) {
            document.querySelector('body').classList.add('darkmode');
        } else {
            document.querySelector('body').classList.remove('darkmode');
        }
    }, [darkMode])
    const switchChange = () => {
        setImperial(!imperial);
        let weatherObject = {...weather};
        weatherObject.metric = imperial;
        dispatch(changeWeather(weatherObject));
    }
    const openNavbar = () => {
        if (!navbar.current.classList.contains('opened')) {
            navbar.current.classList.add('opened');
            overlay.current.style.display = 'block';
            setTimeout(() => {
                overlay.current.classList.add('visible')
            }, 100)
        } else {
            navbar.current.classList.remove('opened');
            overlay.current.classList.remove('visible');
            setTimeout(() => {
                overlay.current.style.display = 'none';
            }, 350);
        }
    }
    const detectDarkMode = () => {
        if (window.localStorage.darkMode) {
            setDarkMode(JSON.parse(window.localStorage.darkMode));
        }
    }
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        window.localStorage.darkMode = !darkMode;
        props.toggleDarkMode();
    }
    return (
        <div className='header' ref={header}>
            {mobile ? <div className='overlay' ref={overlay} onClick={openNavbar}></div> : ''}
            {mobile ? <IconButton classes={{root: 'open-navbar'}} onClick={openNavbar}>
                <MenuIcon />
            </IconButton> : ''}
            <a className='logo' href='/'>
                <img alt='logo' src='logo.svg' />
                <h2>Weather App</h2>
            </a>
            <div className='buttons' ref={navbar}>
                {mobile ? <IconButton classes={{root: 'close-navbar'}} onClick={openNavbar}>
                    <ClearIcon />
                </IconButton> : ''}
                <div className='toggles'>
                    <div className='temperature'>
                        <span>C</span>
                        <Switch checked={imperial} color='primary' onChange={switchChange} />
                        <span>F</span>
                    </div>
                    <div className='dark-light'>
                        <IconButton onClick={toggleDarkMode}>
                            {darkMode ? <LightMode /> : <DarkMode />}
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
