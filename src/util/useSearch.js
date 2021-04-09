import React, {useEffect, useState} from 'react'

export default function useSearch(text) {
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
    const apikey = '5mLooQmy9jmzMXfrkq1DG5rbTAC2RDqr';
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
