import {useState, useEffect} from 'react'
import useApiKey from './useApiKey';

export default function useAutocomplete(text) {
    const apikey = useApiKey();

    const [autocompleteArray, setAutocompleteArray] = useState([]);

    useEffect(() => {
        let autocompleteArray = ['Search For A City'];
        fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${text}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(city => {
                autocompleteArray.push(city.LocalizedName);
            })
            setAutocompleteArray(autocompleteArray);
        }).catch(error => {
            console.log(error)
            autocompleteArray = ['An Error Has Occoured']
        })
        
    }, [text]) 
    return autocompleteArray;
}
