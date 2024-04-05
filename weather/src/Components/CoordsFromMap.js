import React, {useState}from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import axios from "axios";
import InformationTable from "./InformationTable";
import Country from "./Country";
import FormaInput from "./FormaInput"


const API_KEY = 'ed5b13e0fff6479e50160511418fb26e'
const url_country = 'https://restcountries.com/v3.1/all'
const collatore = new Intl.Collator()




function CoordsFromMap() {
    let [countrys, setCountrys] = useState();
    let [city, setCity] = useState();
    let [weather, setWeather] = useState()


    function chandgeCity(value) {
        console.log("БУМЕРАНГ",value)
        console.log("Бумеранг2", city)
        return setCity(value)
    }
    




    function getCity(path) {
        return axios.get(path).then(res =>{
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
        let x = e.get('coords')[0]
        let y = e.get('coords')[1]
        let time = Math.round(new Date().getTime()/1000.0)
        const url_city = `http://api.openweathermap.org/geo/1.0/reverse?lat=${x}&lon=${y}&limit=5&appid=${API_KEY}`
        const url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${x}&lon=${y}&dt=${time}&units=metric&appid=${API_KEY}`
        getCity(url_city)
        getWeather(url_weather)
        getCoutrys(url_country)

            
    }

    




    return(
        <YMaps>
        <div><b>Выбери город на корте!</b></div>
        <Map onClick={clickOnMap} defaultState={{ center: [53.89, 27.535], zoom: 9 }} />
        <InformationTable city={city} weather={weather}/>
        <Country countrys={countrys}  chandgeCity={chandgeCity}/>
        <FormaInput city={city}/>
        </YMaps>

    )
}

export default CoordsFromMap