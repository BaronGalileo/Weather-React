import React, {useEffect, useState, useMemo}from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import axios from "axios";
import InformationTable from "./InformationTable";
import Country from "./Country";
import FormaInput from "./FormaInput"



const API_KEY = 'ed5b13e0fff6479e50160511418fb26e'
const url_country = 'https://restcountries.com/v3.1/all'
const collatore = new Intl.Collator()




function CoordsFromMap() {
    const [countrys, setCountrys] = useState();
    const [capital, setCapital] = useState()
    const [city, setCity] = useState([]);
    const [weather, setWeather] = useState()
    const [zoom, setZoom] = useState(9)
    const [isOff, setIsOff] = useState(false)
    const [center, setCenter] = useState([55.75, 37.57])
    console.log("city", city)

    useEffect(() => {

        return () => {
            
        }
    },[city, weather, center])




    const mapState = useMemo(
        () => ({center, zoom}),
        [center, zoom]
      );


      

    useEffect(() => {
        (() => {
            if (countrys  && city.length) {
                countrys.map(country => {
                    if (city[0].country === country.cca2) {
                    setCapital(country)
                }
            })}
            else setCapital(null)
        })();
      
        return () => {
        }
    }, [city, countrys])


    function chandgeCity(value) {
        setCity(value)
        !countrys && getCoutrys(url_country)
        setCenter([value[0].lat, value[0].lon])
      
    }



    function chandgeCityFromCountry(value) {
        setCenter([value.capitalInfo.latlng[0], value.capitalInfo.latlng[1]])
        setCapital(value)
        let lat = value.capitalInfo.latlng[0]
        let lon = value.capitalInfo.latlng[1]
        return makeAWeatherForecast(lat, lon) 

    }

    function chandgeWeather(value) {

        return setWeather(value)

    }
    

    function getCity(path) {
        return axios.get(path).then(res =>{
            res.data[0] ? setCity(res.data) : setCity(null)
                setCity(res.data)
            
        })
        }
          
    function getWeather(path) {
        return axios.get(path).then(res =>{
            setWeather(res.data)

        })
        }


    function getCoutrys(path) {
        return axios.get(path).then(res => {
            let dict = res.data
            dict.sort((a, b) => collatore.compare(a.name.official, b.name.official))
            setCountrys(dict)
            
        })
    }





    function clickOnMap(e) {

        !countrys && getCoutrys(url_country)
        let x = e.get('coords')[0]
        let y = e.get('coords')[1]
        makeAWeatherForecast(x, y)
          
    }

    function myCity(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setCenter([lat, lon])
                makeAWeatherForecast(lat, lon)
            })
        }
    }

    function makeAWeatherForecast(lat, lon) {
        let time = Math.round(new Date().getTime()/1000.0)
        !countrys && getCoutrys(url_country)
        let x = lat
        let y = lon
        const url_city = `http://api.openweathermap.org/geo/1.0/reverse?lat=${x}&lon=${y}&limit=5&appid=${API_KEY}`
        const url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${x}&lon=${y}&dt=${time}&units=metric&appid=${API_KEY}`
        getWeather(url_weather)
        getCity(url_city)

    }

    




    return(
        <YMaps>
        <div><b>Выбери город на корте!</b></div>
        {capital &&
        <div className="capital">Столица : {capital.capital[0]} страны: {capital.name.official} 
            <img className="flag-Country" src={capital.flags.svg}alt="флаг страны" />
        </div>}
        <Map onClick={clickOnMap} state={mapState} defaultState={mapState} />
        <button onClick={myCity}>Погода дома!</button>
        {city.length && weather &&
        <div>
        <div>Прогноз на сегодня в {city[0].name}</div>
            <p>Температура воздуха <b>{weather.daily[0].temp.min} - {weather.daily[0].temp.max}°С</b> </p>
            <p> Скорость ветра <b>{weather.daily[0].wind_speed}</b></p>
        <button className="showBlock" onClick={() => setIsOff(!isOff)}>Прогноз в {city[0].name} на неделю</button>
        </div>}
        <InformationTable  isOff={isOff} city={city} weather={weather}/>
        <Country countrys={countrys}  chandgeCityFromCountry={chandgeCityFromCountry}/>
        <FormaInput API_KEY={API_KEY} city={city} chandgeWeather={chandgeWeather} chandgeCity={chandgeCity} />
        </YMaps>

    )
}

export default CoordsFromMap