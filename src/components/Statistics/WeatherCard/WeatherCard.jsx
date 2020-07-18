import React, { useEffect, useState } from 'react'
import { DataTracker } from "./DataTracker/DataTracker"
import { DAY_TEMPERATURE, NIGHT_TEMPERATURE, MORNING_TEMPERATURE, HUMIDITY } from './../../../constants/constants'
import './WeatherCard.css'

export const WeatherCard = (props) => {
    const { data, variant } = props;
    const dataTracker = new DataTracker();

    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)
    const [mean, setMean] = useState(null)
    const [mode, setMode] = useState(null)

    useEffect(() => {
        data.forEach((element) => {
            dataTracker.insert(element)
        })
        console.log(dataTracker.showMin())

        setMin(dataTracker.showMin())
        setMax(dataTracker.showMax())
        setMean(dataTracker.showMean())
        setMode(dataTracker.showMode())
    }, [data, dataTracker])

    const getLabel = () => {
        switch (variant) {
            case DAY_TEMPERATURE:
                return 'Day'
            case NIGHT_TEMPERATURE:
                return 'Night'
            case MORNING_TEMPERATURE:
                return 'Morning'
            case HUMIDITY:
                return 'Humidity'
            default:
                return ''
        }
    }

    const getUnit = () => variant === HUMIDITY ? '%' : '\u00b0'


    return (
        <div className="Card-root">
            <div className="Label">
                {getLabel()}
            </div>
            <div>
                Max: {max}{getUnit()}<br />
                Min: {min}{getUnit()}<br />
                Mean: {mean}{getUnit()}<br />
                Mode: {mode}{getUnit()}<br />
            </div>
        </div>
    )
}