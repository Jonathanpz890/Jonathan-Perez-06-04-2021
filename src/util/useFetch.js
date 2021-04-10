import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeWeather} from '../actions'
import useApiKey from './useApiKey';


export default function useFetch(cityID) {
    const apikey = useApiKey();
    const dispatch = useDispatch();
    //States
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const search = async () => {
            if (!cityID) {
                if (cityID === null) {
                    setLoading(false);
                    setFetchError(true);
                    return
                }
            }
            if (!loading) {
                setLoading(true)
            }
            let weatherObject = {
                cityID: cityID,
                metric: true
            }
            const cityNameRes = await fetch(`https://dataservice.accuweather.com/locations/v1/${cityID}?apikey=${apikey}`).catch(error => {
                console.log(error);
                setLoading(false);
                setFetchError(true);
            })
            if (!cityNameRes) {return}
            const cityNameData = await cityNameRes.json();
            if (!cityNameData) {return}
            weatherObject.city = cityNameData.LocalizedName;
            
            const tempInfoRes = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityID}?apikey=${apikey}&language=en`).catch(error => {
                console.log(error);
                setLoading(false);
                setFetchError(true)
            })
            if (!tempInfoRes) {return}
            const tempInfoData = await tempInfoRes.json();
            weatherObject.currentTemp = {
                f: Math.round(tempInfoData[0].Temperature.Imperial.Value),
                c: Math.round(tempInfoData[0].Temperature.Metric.Value)
            }
            weatherObject.icon = tempInfoData[0].WeatherIcon.toString().length < 2 ? '0' + tempInfoData[0].WeatherIcon : tempInfoData[0].WeatherIcon;
            weatherObject.title = tempInfoData[0].WeatherText;
            
            const fiveDayRes = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=${apikey}&language=en&details=false&metric=true`).catch(error => {
                console.log(error);
                setLoading(false);
                setFetchError(true);
            })
            if (!fiveDayRes) {return}
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
            
            const fiveDayImperialRes = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=${apikey}&language=en&details=false&metric=false`).catch(error => {
                console.log(error);
                setLoading(false);
                setFetchError(true);
            })
            if (!fiveDayImperialRes) {return}
            const fiveDayImperialData = await fiveDayImperialRes.json();
            fiveDayImperialData.DailyForecasts.forEach((fore, index) => {
                weatherObject.fiveDay[index].maxTemp.f = fore.Temperature.Maximum.Value;
                weatherObject.fiveDay[index].minTemp.f = fore.Temperature.Minimum.Value;
            })

            dispatch(changeWeather(weatherObject))
            setLoading(false);
        }
        search();
    }, [cityID])
    return {loading, fetchError};
}
