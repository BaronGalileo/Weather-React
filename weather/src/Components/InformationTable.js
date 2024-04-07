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



    props.isOff && props.weather && props.weather.daily.map((value, index) => {
        let time = new Date(value.dt*1000)
        while(index < 5 ) {
            console.log(value)
            debugger


        return (
            <>
            <div>
                <button className="show"  id={index} onClick={show}>Погода на {time.toLocaleDateString(value.dt)} в {props.city[0].name}</button>
                    <div className="weather" id={index} key={index}>
                        <div className="monitor">
                            <h3>Погода на {time.getDate(value.dt)} число в городе {props.city && props.city[0].name}</h3>
                            <p>Температура воздуха <b>{value.temp.min}°С - {value.temp.max}°С</b> </p>
                            <p> Скорость ветра <b>{value.wind_speed} м/с</b></p>
                            <p> Ожидается <b> {value.weather[0].description}</b></p>
                        </div>
                    </div>
            </div>
            </>
        )
    }
        

    })
    

        )}
    

export default InformationTable