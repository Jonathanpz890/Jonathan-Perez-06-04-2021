import {useEffect, useState} from 'react'
import useApiKey from './useApiKey';

export default function useSearch(text) {
    const apikey = useApiKey();
    //States
    const [searchIDError, setSearchIDError] = useState(false);
    const [searchID, setSearchID] = useState('')
    
    useEffect(() => {
        const search = async () => {
            const cityRes = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${text}`).catch(error => {
                console.log(error);
                setSearchIDError(true)
            })
            if (!cityRes) {return null};
            const cityData = await cityRes.json();
            if (cityData[0]) {
                setSearchID(cityData[0].Key);
            } else {
                setSearchID('');
            }
        }
        search();
    }, [text])
    return {searchID, searchIDError};
}
