import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeWeather} from '../actions'

export default function useGeolocate() {
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();
    // const apikey = 'tS4fpOANx6ipQMJdAy0MeC3gSiGVaarH';
    // const apikey = 'ff6qcnN7nPv193t2sPEYmtXp48ABHgFN';
    // const apikey = 'FoxoAhAfxFWAeI6WnFSl0GmKwxLjRsgq';
    // const apikey = 'eduzhxG2ainxv6XCkyiyagUCCZJOVwaG';
    // const apikey = 'WWX2pD327lzNkI4dGD6IKAK88Ae6Q78C';
    // const apikey = 'VylUpohIp2nE54xHyyiO9GhzvgA0KA0Z';
    // const apikey = 'fUcsADNu1RmcaIoZ4q3M4lieZhIAxcwo';
    // const apikey = 'YVKWxUxLkOv8GhGoiGLbUWJAzC3khnmC';
    // const apikey = 'VBzXMPmu5eWkDlUivT7VdIUWZYEqAG0H';
    // const apikey = '5eJbuDZmUMEZGQ16FJ0uDuhGvMOXu366';
    // const apikey = 'lBu66EmnhBvyZs1LrbGEdpAoIngA2F9G';
    const apikey = 'dpboAufPfAvktT4ycGW1pGddDzDtC5hq';
    let [cityID, setCityID] = useState(null);

    useEffect( async () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async position => {
                if (!position) {
                    setCityID('215854');
                    weather.cityID = '215854';
                    dispatch(changeWeather(weather));
                    console.log(cityID);
                    return;
                }

                const geolocationRes = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${position.coords.latitude},${position.coords.longitude}`)
                const geolocationData = await geolocationRes.json();
                setCityID(geolocationData.Key)
                weather.cityID = geolocationData.Key;
                dispatch(changeWeather(weather))

            }, () => {
                setCityID('215854');
                weather.cityID = '215854';
                dispatch(changeWeather(weather));
            })
        } else {
            setCityID('215854');
            weather.cityID = '215854';
            dispatch(changeWeather(weather));
        }
    }, [cityID])
    return cityID;
}
