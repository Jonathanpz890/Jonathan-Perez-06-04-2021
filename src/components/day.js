import React from 'react'

export default function Day(props) {
    return (
        <div className='day'>
            <h2>{props.dayName}</h2>
            <h3>{props.maxTemp}&#176; {props.unit}</h3>
            <h3>{props.minTemp}&#176; {props.unit}</h3>
        </div>
    )
}
