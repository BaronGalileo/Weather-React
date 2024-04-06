import React, {useState, useEffect} from "react";

function DateTime() {
    const [date, setDate] = useState(new Date())

    useEffect(() =>{

        let timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    })


    return (
        <div>
            <p>Сегодня : {date.toLocaleDateString()} Время : {date.toLocaleTimeString()}</p>
        </div>
    )
}

export default DateTime