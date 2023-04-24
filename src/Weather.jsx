import React, { useState, useEffect } from 'react';
import './App.css';
import { FaSearch } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

function Weather() {
  const [city, setCity] = useState(null);
  const [weather, setweather] = useState(null);
  const [temprature, settemprature] = useState(null)//wind
  const [search, setSearch] = useState("surat");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=fe4b914629450b66e2dc9014b6570550&units=metric`
      const response = await fetch(url);
      const jsonobj = await response.json();
      setCity(jsonobj.main);
      setweather(jsonobj);
      settemprature(jsonobj.wind)
      console.log(jsonobj)
    }

    fetchData();
  }, [search]);

  return (
    <div className='mainbody'>
      <div className="inputbox d-flex justify-content-center align-items-center">
        <input
          type="search"
          value={search}
          placeholder="Enter a city"
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <i className='ms-2'><FaSearch /></i>
      </div>
      {!city ? (
        <p className='mt-4'>No data found</p>
      ) : (
        <div className='weatherbody'>
          <div className="city">
            <h2>{search}</h2>
          </div>
          <div className="imgboxs mb-2 d-flex justify-content-around align-items-center">
            <div className="imeges">
              <img src={require("./sun.png")} alt="img loaded" width="100px" className='imgesun' />
              <img src={require("./cloud.png")} alt="img loaded" width="100px" className='imgcloude' />
            </div>
            <div className="weathertemp mt-3">
              <h1 className='text-warning'>{city.temp}°C</h1>
              <h3 className='text-warning'>{weather.weather[0].main}</h3>
            </div>
          </div>
          <div className="weatherdetails mt-4">
            <table className='table'>
              <tbody className='text-white'>
                <tr itemScope="row">
                  <td>Humidity : </td>
                  <td>{city.humidity}</td>
                </tr>
                <tr itemScope="row">
                  <td>Air pressure : </td>
                  <td>{city.pressure}</td>
                </tr>
                <tr itemScope="row">
                  <td>Wind Speed : </td>
                  <td>{temprature.speed}</td>
                </tr>
                <tr>
                  <td>Wind Degree : </td>
                  <td>{temprature.deg}</td>
                </tr>
                <tr itemScope="row">
                  <td>TimeZone : </td>
                  <td>{weather.timezone}</td>
                </tr>
                <tr itemScope="row">
                  <td>Country Code: </td>
                  <td>{weather.sys.country}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="copy text-end text-muted m-0">Copyright@sahil_JR</p>
        </div>
      )
      }
    </div>
  );
}

export default Weather;