import React, { useEffect, useState } from "react";

const getFlagEmoji = countryCode=>String.fromCodePoint(...[...countryCode.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt(0)))

const LocationInfo = (props) => {
  const [sunSetRise, setSunSetRise] = useState([]);

  useEffect(
    () =>
      convertFromEcho(props.location.sys.sunrise, props.location.sys.sunset),
    [props.location]
  );

  const getDegreeFormat = () => (props.degreeFormat ? "°F" : "°C");

  const convertToFarenheits = (v) => Math.round((v * 9) / 5) + 32;

  const convertFromEcho = (rise, set) => {
    setSunSetRise([
      new Date(rise * 1000).toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      new Date(set * 1000).toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    ]);
  };

  return (
    <div className="location-info">
      <div
        className="align-center"
        style={{
          gap: "20px",
          fontSize: "40px",
          margin: "0px",
        }}
      >
        <p style={{ margin: 0 }}>
          {props.location.name}, {props.location.sys.country}
        </p>
      </div>
      <div>
        <p
          className="align-center"
          style={{
            fontSize: "30px",
          }}
        >
          {props.degreeFormat
            ? convertToFarenheits(Math.round(props.location.main.temp))
            : Math.round(props.location.main.temp)}
          {props.degreeFormat ? "°F" : "°C"}

          <img
            alt="weather-icon"
            src={`http://openweathermap.org/img/wn/${props.location.weather[0].icon}@2x.png`}
          ></img>
        </p>
        <p>
          Feels like{" "}
          {props.degreeFormat
            ? convertToFarenheits(Math.round(props.location.main.feels_like))
            : Math.round(props.location.main.feels_like)}
          {getDegreeFormat()} | {props.location.weather[0].description} |
          Humidity: {props.location.main.humidity}%
        </p>
        <p>
          Sunrise: {sunSetRise[0]} | Sunset: {sunSetRise[1]}
        </p>
        <p></p>
        <br></br>
      </div>
    </div>
  );
};

export default LocationInfo;
