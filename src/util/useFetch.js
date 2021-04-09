import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeWeather} from '../actions'

export default function useFetch(cityID) {
    // const weather = useSelector(state => state.weather)
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

    const [loading, setLoading] = useState(true)
    useEffect( async () => {
        if (cityID === null) {
            return;
        }
        let weatherObject = {
        }
        const cityNameRes = await fetch(`http://dataservice.accuweather.com/locations/v1/${cityID}?apikey=${apikey}`)
        const cityNameData = await cityNameRes.json();
        weatherObject.city = cityNameData.LocalizedName;
        console.log((cityNameData))
        
        const tempInfoRes = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityID}?apikey=${apikey}&language=en`);
        const tempInfoData = await tempInfoRes.json();
        weatherObject.currentTemp = {
            f: Math.round(tempInfoData[0].Temperature.Imperial.Value),
            c: Math.round(tempInfoData[0].Temperature.Metric.Value)
        }
        weatherObject.icon = tempInfoData[0].WeatherIcon.toString().length < 2 ? '0' + tempInfoData[0].WeatherIcon : tempInfoData[0].WeatherIcon;
        weatherObject.title = tempInfoData[0].WeatherText;
        
        const fiveDayRes = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=${apikey}&language=en&details=false&metric=true`)
        const fiveDayData = await fiveDayRes.json();
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']
        const today = new Date().getDay();
        days = days.splice(today, 5);
        days[0] = 'Today';
        weatherObject.fiveDay = [];
        fiveDayData.DailyForecasts.forEach((fore, index) => {
            weatherObject.fiveDay.push({
                day: days[index],
                maxTemp: {
                    c: Math.round(fore.Temperature.Maximum.Value),
                    f: ''
                },
                minTemp: {
                    c: Math.round(fore.Temperature.Minimum.Value),
                    f: '',
                }
            })
        })
        
        const fiveDayImperialRes = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=${apikey}&language=en&details=false&metric=false`)
        const fiveDayImperialData = await fiveDayImperialRes.json();
        fiveDayImperialData.DailyForecasts.forEach((fore, index) => {
            weatherObject.fiveDay[index].maxTemp.f = fore.Temperature.Maximum.Value;
            weatherObject.fiveDay[index].minTemp.f = fore.Temperature.Minimum.Value;
        })

        console.log(weatherObject);
        dispatch(changeWeather(weatherObject))
        console.log('updated');
        setLoading(false);
    }, [cityID])
    return loading;
}
