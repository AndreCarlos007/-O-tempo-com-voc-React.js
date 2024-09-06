import React from "react"
import "./Tempinfo.css"

function Tempinfo( {tempo}) {
    return(
        <div
        className="caixaInfo">
            <h1 className="">{tempo.name}</h1>
            <div className="tempoInfo">
            <img src={`http://openweathermap.org/img/wn/${tempo.weather[0].icon}.png`}/>
            <p className="temperatura">{Math.round(tempo.main.temp)}°C</p>
            </div>
            <p className="descricao">{tempo.weather[0].description}</p>
            <div className="detalhes">
                <p>Sensação térmica: {Math.round(tempo.main.feels_like)}°C</p>
                <p><span classname="flex"> Umidade: {tempo.main.humidity} %</span></p>
                <p>Pressão: {tempo.main.pressure}</p>
            </div>
        </div>
    )
}

export default Tempinfo