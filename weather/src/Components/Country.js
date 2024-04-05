import React from "react";




function Country(props) {

    function chench(value) {
        props.chandgeCity(value)
        
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
    chench(props.countrys[e.target.nextElementSibling.id].capital[0])
    showCantry()
 }






    return(
        <>
        <button onClick={showCantry}>Страны</button>
        <div className="countrys">
        {props.countrys &&
            props.countrys.map((value, index) => {

                return (
                    <div className="country" key={index}>

                        <button onClick={choose}>Выбрать</button>
                        <p id={index}>{value.cca2} код страны -- Название: {value.name.official} Столица {value.capital}</p>
                    </div>
                    
                )})}
        </div>
        </>
    )

}


export default Country