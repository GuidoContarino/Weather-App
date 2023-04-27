import React, { useState } from "react";
import axios from "axios"; //librería que nos permite hacer peticiones HTTP a un servidor.

function App() {
  // defino dos estados con la función useState
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // defino la URL para hacer la petición a la API del clima
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  // defino la función searchLocation que se ejecutará cuando se presione la tecla Enter en el input de búsqueda
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      // hago una petición GET a la API del clima usando Axios
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      // limpia el input de búsqueda
      setLocation("");
    }
  };

  const celsiusToFahrenheit = (farenheit) => {
    return ((farenheit - 32) * 5) / 9;
  };

  const mphToKph = (mph) => {
    return mph / 1.60934;
  };

  const windSpeedInKph = (speed) => {
    return mphToKph(speed).toFixed();
  };

  // retorna el HTML que se va a renderizar
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Buscar Ciudad"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{celsiusToFahrenheit(data.main.temp).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {celsiusToFahrenheit(data.main.feels_like).toFixed()}°C
                </p>
              ) : null}
              <p>S.Térmica</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{windSpeedInKph(data.wind.speed)} KM/H</p>
              ) : null}
              <p>Velocidad del Viento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/*explicacion de mi codigo : 
En la primera línea, estoy creando un contenedor principal llamado "app" que va a englobar todo el contenido.

Dentro del contenedor "app", tengo un elemento "search" que contiene un input de búsqueda. Cuando el usuario escribe algo en el input, el evento "onChange" actualiza el estado de la variable "location" con el valor del input.

Cuando el usuario presiona la tecla "Enter" en el input, se dispara la función "searchLocation" que realiza una petición a una API de clima para obtener información sobre la ciudad ingresada.

En el contenedor "container", tengo dos secciones: "top" y "bottom". En "top" se muestra información básica del clima como el nombre de la ciudad, la temperatura y la descripción del clima.

En la sección "bottom", muestro información adicional como la sensación térmica, la humedad y la velocidad del viento. Estos datos se obtienen de la misma respuesta de la API de clima.

Finalmente, uso algunos operadores ternarios para verificar si los datos de clima están disponibles antes de mostrarlos en la pantalla.s*/

// exporta el componente para que pueda ser utilizado por otros componentes
export default App;
