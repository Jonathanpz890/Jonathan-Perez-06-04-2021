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
    // const apikey = 'YyNBnCsnjBjIUxcFzA5rtGGe2jdLSUwA';
    const apikey = '5mLooQmy9jmzMXfrkq1DG5rbTAC2RDqr';

    const [favoriteListError, setFavoriteListError] = useState(false);
    const [favoriteList, setFavoriteList] = useState([]);
    useEffect(async () => {
        const tempList = [];
        //city name, current temp, title
        console.log(favorites);
        for (const favorite of favorites) {
            if (!favorite) {break};
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
            const cityRes = await fetch(`https://dataservice.accuweather.com/locations/v1/${favorite}?apikey=${apikey}`).catch(error => {
                console.log(error)
                setFavoriteListError(true)
            })
            if (!cityRes) {return}
            const cityData = await cityRes.json();
            item.city = cityData.LocalizedName;
            const currentTempRes = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${favorite}?apikey=${apikey}&language=en`).catch(error => {
                console.log(error)
                setFavoriteListError(true)
            })
            if (!currentTempRes) {return}
            const currentTempData = await currentTempRes.json();
            console.log(currentTempData);
            item.currentTemp.c = Math.round(currentTempData[0].Temperature.Metric.Value);
            item.currentTemp.f = Math.round(currentTempData[0].Temperature.Imperial.Value);
            item.title = currentTempData[0].WeatherText;
            tempList.push(item);
        }
        setFavoriteList(tempList);
    }, [favorites])
    return {favoriteList, favoriteListError};
}
