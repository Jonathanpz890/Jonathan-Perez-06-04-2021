import React, {useEffect, useState} from 'react'

export default function useFavorites(favorites) {
    // const apikey = 'tS4fpOANx6ipQMJdAy0MeC3gSiGVaarH';
    // const apikey = 'ff6qcnN7nPv193t2sPEYmtXp48ABHgFN';
    // const apikey = 'FoxoAhAfxFWAeI6WnFSl0GmKwxLjRsgq';
    // const apikey = 'eduzhxG2ainxv6XCkyiyagUCCZJOVwaG';
    // const apikey = 'VylUpohIp2nE54xHyyiO9GhzvgA0KA0Z';
    // const apikey = 'fUcsADNu1RmcaIoZ4q3M4lieZhIAxcwo';
    // const apikey = 'YVKWxUxLkOv8GhGoiGLbUWJAzC3khnmC';
    // const apikey = 'VBzXMPmu5eWkDlUivT7VdIUWZYEqAG0H';
    // const apikey = '5eJbuDZmUMEZGQ16FJ0uDuhGvMOXu366';
    // const apikey = 'lBu66EmnhBvyZs1LrbGEdpAoIngA2F9G';
    const apikey = 'dpboAufPfAvktT4ycGW1pGddDzDtC5hq';
    // const apikey = 'YyNBnCsnjBjIUxcFzA5rtGGe2jdLSUwA';


    const [favoriteList, setFavoriteList] = useState([]);
    useEffect(async () => {
        const tempList = [];
        //city name, current temp, title
        console.log(favorites);
        for (const favorite of favorites) {
            if (favorite.length < 1) {break};
            // favorites.forEach(async (favorite, index) => {
            let item = {
                city: '',
                cityID: favorite,
                currentTemp: {
                    c: '',
                    f: '',
                },
                title: ''
            }
            await fetch(`http://dataservice.accuweather.com/locations/v1/${favorite}?apikey=${apikey}`)
            .then(res => res.json())
            .then(data => {
                item.city = data.LocalizedName;
            })
            await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${favorite}?apikey=${apikey}&language=en`)
            .then(res => res.json())
            .then(data => {
                item.currentTemp.c = Math.round(data[0].Temperature.Metric.Value);
                item.currentTemp.f = Math.round(data[0].Temperature.Imperial.Value);
                item.title = data[0].WeatherText;
            })
            tempList.push(item);
            // console.log(tempList);
        }
        // console.log('tempList');
        setFavoriteList(tempList);
    }, [favorites])
    return favoriteList;
}
