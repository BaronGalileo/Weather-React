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
        const contry = null
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${contry}&limit=1&appid=${props.API_KEY}`
    

        
        axios.get(url).then(res => {
            chandgeCity(res.data)
            const x = res.data[0].lat
            const y = res.data[0].lon
            let url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${x}&lon=${y}&units=metric&appid=${props.API_KEY}`
            axios.get(url_weather).then(res => {
                chandgeWeather(res.data)
            })
            
        })

    }



    return(
        <>
        <form onSubmit={weatherForCity}>
            <input name="city" placeholder="Введите город"></input>
            <button>Прогноз погоды</button>
        </form>

        </>
    )
}

export default FormaInput