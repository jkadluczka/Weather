import React, { useEffect, useState } from 'react'
import { WeatherCard } from './WeatherCard/WeatherCard'
import './Statistics.css'
import { DAY_TEMPERATURE, NIGHT_TEMPERATURE, MORNING_TEMPERATURE, HUMIDITY } from './../../constants/constants'

const Statistics = () => {
    const [apiData, setApiData] = useState([])
    const [dayTemperatureArray, setDayTemperatureArray] = useState([])
    const [nightTemperatureArray, setNightTemperatureArray] = useState([])
    const [morningTemperatureArray, setMorningTemperatureArray] = useState([])
    const [humidityArray, setHumidityArray] = useState([])

    const getData = async () => {
        await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=current,minutely,hourly&appid=4df42ece41dd84608ce224da2680751d&cnt=5&units=metric')
            .then((response) => response.json())
            .then((response) => {
                setApiData(response.daily)
            })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const dayArray = [];
        const nightArray = [];
        const morningArray = [];
        const humidityArray = [];

        apiData.map(element => {
            dayArray.push(element.temp.day)
            nightArray.push(element.temp.night)
            morningArray.push(element.temp.morn)
            humidityArray.push(element.humidity)
        })

        setDayTemperatureArray(dayArray)
        setNightTemperatureArray(nightArray)
        setMorningTemperatureArray(morningArray)
        setHumidityArray(humidityArray)
    }, [apiData])

    const getDate = () => {
        const dateFrom = new Date(apiData[0].dt * 1000)
        const dateTo = new Date(apiData[apiData.length - 1].dt * 1000)
        return `${dateFrom.getDate()}.${dateFrom.getMonth()}.${dateFrom.getFullYear()} - ${dateTo.getDate()}.${dateTo.getMonth()}.${dateTo.getFullYear()}`
    }

    return (
        <div>
            {apiData.length && (
                <div className="Label">
                    Weather cast for {getDate()}
                </div>)}
            <div className="Card-container">
                <WeatherCard variant={DAY_TEMPERATURE} data={dayTemperatureArray} />
                <WeatherCard variant={NIGHT_TEMPERATURE} data={nightTemperatureArray} />
                <WeatherCard variant={MORNING_TEMPERATURE} data={morningTemperatureArray} />
                <WeatherCard variant={HUMIDITY} data={humidityArray} />
            </div>
        </div>

    )
}

export default Statistics
