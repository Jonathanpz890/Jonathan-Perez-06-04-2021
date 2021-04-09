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
    const apikey = 'kY8Opl0WFOzNYorp5nmoX4fHMD3VSu2N';

    const [cityID, setCityID] = useState('')
    useEffect(async () => {
        await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${text}`)
        .then(res => res.json())
        .then(data => {
            if (data[0]) {
                setCityID(data[0].Key);
            } else {
                setCityID('');
            }
        })
    }, [text])
    return cityID
}
