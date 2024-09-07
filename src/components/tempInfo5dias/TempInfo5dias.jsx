import React from "react"
import "./Days5.css"

function TempInfo5dias({ tempo5dias }) {

    let diasApi = {};

    for (let forecast of tempo5dias.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()
        if (!diasApi[date]) {
            diasApi[date] = forecast
        }
    }

    const proxDias = Object.values(diasApi).slice(0, 4)

    function convertData(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })
        return newDate

    }


    return (
        <div

            className="weather-container">
            <h3>Previsão dos próximos 4 dias</h3>

            <div
                className="weather-list">
                {proxDias.map(forecast => (
                    <div key={forecast.dt} className="weather-item">
                        <p className="forecast-day">{convertData(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} />
                        <p className="forecast-descricao">{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}ºC min / {Math.round(forecast.main.temp_max)}ºC max</p>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default TempInfo5dias