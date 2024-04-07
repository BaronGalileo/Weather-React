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
    const [nowTime, setNowTime] = useState()
    const [capital, setCapital] = useState()
    const [city, setCity] = useState([]);
    const [weather, setWeather] = useState()
    const [weatherDaily, setWeatherDaily] = useState()
    const [zoom, setZoom] = useState(9)
    const [isOff, setIsOff] = useState(false)
    const [center, setCenter] = useState([55.75, 37.57])

    

    useEffect(() => {

        return () => {
            
        }
    },[city, weather, center, isOff, weatherDaily])




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

    const pathLogo = useMemo(
    
        () => pathLogoWeather(weatherDaily),
        [weatherDaily]
      );


    function pathLogoWeather(weatherDaily) {
        if(weatherDaily){
            let icon_id = weatherDaily.weather[0].id
            if (icon_id >= 200 && icon_id <= 232) {
                return "./logo-weather/1.png"

            }
            else if (icon_id === 801 || icon_id ===802 ) {
                return "./logo-weather/7.png"
                
            }
            else if (icon_id >= 500 && icon_id <= 504) {
                return "./logo-weather/3.png"
            }
            else if (icon_id >= 600 && icon_id <= 622 ) {
                return "./logo-weather/4.png"
            }
            else if (icon_id >= 600 && icon_id <= 622 ) {
                return "./logo-weather/4.png"
            }
            else if ((icon_id >= 600 && icon_id <= 622 ) || icon_id === 511) {

                return "./logo-weather/4.png"
            }
            else if (icon_id >= 701 && icon_id <= 781 ) {

                return "./logo-weather/5.png"
            }
            else if (icon_id === 800) {

                return "./logo-weather/6.png"
            }
            else if (icon_id === 803 || icon_id === 804 ) {
                return "./logo-weather/8.png"
            }
            else return "./logo-weather/2.png"
    }}

    


    function chandgeCity(value) {
        setCity(value)
        !countrys && getCoutrys(url_country)
        setCenter([value[0].lat, value[0].lon])
      
    }



    function chandgeCityFromCountry(value) {
 
        if(value.capitalInfo.latlng){
        setCenter([value.capitalInfo.latlng[0], value.capitalInfo.latlng[1]])
        let lat = value.capitalInfo.latlng[0]
        let lon = value.capitalInfo.latlng[1]
            return makeAWeatherForecast(lat, lon) 
        }
        else alert(`К сожалению у ${value.name.common} не удалось найти столицу!`)
    }

    function chandgeWeather(value) {
        setWeatherDaily(value.daily[0])
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
            let date = new Date().getHours()
            if(date >= 0 && date < 6){setNowTime(res.data.daily[0].temp.night)}
                else if(date >= 6 && date < 12){setNowTime(res.data.daily[0].temp.morn)}
                else if(date >= 12 && date < 18){setNowTime(res.data.daily[0].temp.day)}
                else {setNowTime(res.data.daily[0].temp.eve)}            
            setWeatherDaily(res.data.daily[0])
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
        const url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${x}&lon=${y}&lang=ru&dt=${time}&units=metric&appid=${API_KEY}`
        getWeather(url_weather)
        getCity(url_city)

    }

    




    return(

        <YMaps>
        <h2>Выберете город на карте или введите название</h2>
        {capital &&
        <div className="capital">Столица : {capital.capital[0]} страны: {capital.name.official} 
            <img className="flag-Country" src={capital.flags.svg}alt="флаг страны" />
        </div>}
        <Map onClick={clickOnMap} state={mapState} defaultState={mapState} />
        <div className="container">
            <button  className="btn" onClick={myCity}>Погода дома!</button>
        </div>
        {city.length && weather &&
        <div>
            <div className="monitor">
                <div>Сейчас в {city[0].name}</div>
                <p>Температура воздуха <b>{nowTime}°С</b> </p>
                <p> Скорость ветра <b>{weather.daily[0].wind_speed} м/с</b></p>
                <p><img className="logo-weather" src={pathLogo} alt="погода-лого"/><b>{weather.daily[0].weather[0].description}</b></p>
                <div className="container">
                    <button className="btn" onClick={() => setIsOff(!isOff)}>Прогноз в {city[0].name} на пять дней</button>
                </div>
            </div>
        </div>}
        <InformationTable  isOff={isOff} city={city} weather={weather} pathLogoWeather={pathLogoWeather}/>
        <FormaInput API_KEY={API_KEY} city={city} chandgeWeather={chandgeWeather} chandgeCity={chandgeCity} />
        <Country countrys={countrys}  chandgeCityFromCountry={chandgeCityFromCountry}/>
        </YMaps>

    )
}

export default CoordsFromMap