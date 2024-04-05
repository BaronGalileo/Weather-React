import React from "react";


function InformationTable(props) {


    function show(e) {
        let coll = document.getElementsByClassName("show");
        var content =coll[e.target.id].nextElementSibling;
        if(content.style.display === "block") {
            content.style.display = "none"
        }
        else {
            content.style.display = "block"
        }
        
        }


    return(
  

    props.weather && props.weather.daily.map((value, index) => {
        let time = new Date(value.dt*1000)
        return (
            <>
            <div>
                <button className="show"  id={index} onClick={show}>Погода на {time.getDate(value.dt)} в {props.city[0].name}</button>
                <div className="weather" id={index} key={index}>
                    <h3>Погода на {time.getDate(value.dt)} число в городе {props.city && props.city[0].name} </h3>
                    <p>Температура воздуха <b>{value.temp.day}°С</b> </p>
                    <p> Скорость ветра <b>{value.wind_speed}</b></p>
                </div>
            </div>
            </>
        )})

        )}
    

export default InformationTable