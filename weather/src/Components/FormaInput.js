import React from "react";
import axios from "axios";



function FormaInput(props){


    function chandgeWeather(value) {
        props.chandgeWeather(value)
       
    }
    
    function chandgeCity(value) {
        props.chandgeCity(value)
       
    }




    function weatherForCity(e){
        e.preventDefault();
        const city = e.target.elements.city.value
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${props.API_KEY}`

          axios.get(url).then(res => {
            const x = res.data[0].lat
            const y = res.data[0].lon
            chandgeCity(res.data)
            let url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${x}&lon=${y}&lang=ru&units=metric&appid=${props.API_KEY}`
            axios.get(url_weather).then(res => {
                chandgeWeather(res.data)
            })
            
        }).catch(error => {
            alert("Такого города, к сожалению, не нашли. Попробуйте найти его на карте")
        })

    }



    return(
        <>
        <form onSubmit={weatherForCity}>
            <div className="container">
                <input name="city" placeholder="Введите город"></input>
                <button className="btn" >Прогноз погоды</button>
            </div>
        </form>

        </>
    )
}

export default FormaInput