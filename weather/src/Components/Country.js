import React from "react";




function Country(props) {

    function chench(value) {

        props.chandgeCityFromCountry(value)
        
    }



    function showCantry(e) {

        let content = document.getElementsByClassName("countrys");
        if(content[0].style.display === "block") {
            content[0].style.display = "none"
        }
        else {
            content[0].style.display = "block"
        }
 
        
 }

 function choose(e) {

    chench(props.countrys[e.target.nextElementSibling.id])

    showCantry()
 }





    return(
        <>
        {props.countrys &&
        <div>
            <div className="container">
                <button  className="btn" onClick={showCantry}>Выбрать страну</button>
            </div>
            <div className="countrys">
            {props.countrys &&
                props.countrys.map((value, index) => {

                    return (
                    <div className="country"  key={index}>
                            <div className="container" >
                                <button className="btn" onClick={choose}>Выбрать</button>
                                <p id={index}> Страна <b>{value.name.official}</b> Столица <b>{value.capital}</b></p>
                            <img className="flag-Country" src={value.flags.svg}alt="флаг страны" />
                            </div>
                        </div>
                    
                    )})}
            </div>
        </div>}
        </>
        )
    }


export default Country