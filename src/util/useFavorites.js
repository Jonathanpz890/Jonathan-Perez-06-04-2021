import {useEffect, useState} from 'react'
import useApiKey from './useApiKey';

export default function useFavorites(favorites) {
    const apikey = useApiKey();
    //States
    const [favoriteListError, setFavoriteListError] = useState(false);
    const [favoriteList, setFavoriteList] = useState([]);
    
    useEffect(() => {
        const tempList = [];
        const search = async () => {
            for (const favorite of favorites) {
                if (!favorite) {break};
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
        }
        search();
    }, [favorites])
    return {favoriteList, favoriteListError};
}
