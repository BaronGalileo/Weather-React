import React, { useState } from "react";
import axios from "axios";

const API_KEY = 'ed5b13e0fff6479e50160511418fb26e'
const contry = null

function FormaInput(props){

    const [weather, setWeather] = useState(null)


    function weatherForCity(e){
        e.preventDefault();
        const city = e.target.elements.city.value
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${contry}&limit=1&appid=${API_KEY}`
    

        
        axios.get(url).then(res => {
            console.log('Запрос', res.data)
            const x = res.data[0].lat
            const y = res.data[0].lon
            let url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${x}&lon=${y}&units=metric&appid=${API_KEY}`
            afterSending(url_weather,city)
            
        })

    }


    function getWeather(path) {
        return axios.get(path)
      }


    function afterSending(path, city) {
        
        console.log('Dsgjkyztv', path)
        getWeather(path).then(resoult => {
            console.log('DATA', resoult.data.current)
            const stringWeather = `В ${city} сегодня: ${resoult.data.current.temp}°С,
            скорость ветра:${resoult.data.current.wind_speed} метр/сек, 
            влажность: ${resoult.data.current.humidity} %`;
            return setWeather(stringWeather)
        })
    }

    console.log('После',weather)


    return(
        <>
        <form onSubmit={weatherForCity}>
            <input name="city" placeholder="Введите город"></input>
            <button>Прогноз погоды</button>
        </form>
        <div> погода {weather}</div>
        </>
    )
}

export default FormaInput