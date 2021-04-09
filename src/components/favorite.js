import React from 'react'

export default function Favorite(props) {

    const handleClick = () => {
        window.open(`/?cityID=${props.cityID}`, '_self')
    }
    return (
        <div className='favorite' onClick={handleClick}>
            <h1>{props.city}</h1>
            <h3>{props.temperature}&#176;{props.unit}</h3>
            <h2>{props.weatherTitle}</h2>
        </div>
    )
}
