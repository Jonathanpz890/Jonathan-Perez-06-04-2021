import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import useApiKey from './useApiKey';

export default function useGeolocate() {
    const weather = useSelector(state => state.weather);
    const apikey = useApiKey();
    //States
    const [cityID, setCityID] = useState(undefined);
    const [geolocateError, setGeolocateError] = useState(false);

    useEffect(() => {
        const search = async () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(async position => {
                    if (!position) {
                        setCityID('215854');
                        weather.cityID = '215854';
                        return;
                    }
                    const geolocationRes = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${position.coords.latitude},${position.coords.longitude}`).catch(error => {
                        console.log(error);
                        setCityID(null);
                        setGeolocateError(true);
                    })
                    if (!geolocationRes) {return null};
                    const geolocationData = await geolocationRes.json();
                    setCityID(geolocationData.Key)
                    weather.cityID = geolocationData.Key;

                }, () => {
                    setCityID('215854');
                    weather.cityID = '215854';
                })
            } else {
                setCityID('215854');
                weather.cityID = '215854';
            }
        }
        search();
    }, [cityID])
    return {cityID, geolocateError};
}
