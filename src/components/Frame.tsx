import React, { useState } from "react";
import axios from "axios";
import Time from "./Time";

export default function Frame() {
  const [loc, setLoc] = useState<string>();
  const [temp, setTemp] = useState<string>();
  const [err, setErr] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [cond, setCond] = useState<string>();
  //const [next,setNext] = useState<string[]>();
  const showResponse = async (location: string, forecast: string) => {
    setLoc(location);
    setTemp(forecast);
  };

  navigator.geolocation.getCurrentPosition((position) => {
    const lat: number = position.coords.latitude;
    const long: number = position.coords.longitude;
    fetchData(lat, long);
    fetchForecastData(lat, long);
  });

  function fetchData(lat: number, long: number) {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=eea7fd6ff63e4602977155650230104&q=${lat},${long}`
      )
      .then((response) => {
        const location: string = response.data.location.name;
        const forecast: string = response.data.current.temp_c;
        setIcon(response.data.current.condition.icon);
        setCond(response.data.current.condition.text);
        showResponse(location, forecast);
      })
      .catch((error) => {
        setErr(error.message);
      });
  }

  function fetchForecastData(lat: number, long: number) {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=eea7fd6ff63e4602977155650230104&q=${lat},${long}&days=7`
      )
      .then((response) => {
        //to be written
      })
      .catch();
  }
  const forecastHandler = () => {};
  let message = (
    <div className="grid justify-items-center">
      <Time />
      <img src={icon} alt="" />
      <p className="font-mono text-base my-5 mb-5">
        Hey, its {cond} out there. Your Location is {loc} and Temperature is{" "}
        {temp}
      </p>
      <button
        className="rounded-full bg-sky-500/75 hover:bg-sky-500/100 px-5 py-3 my-5"
        onClick={forecastHandler}
      >
        See Next 7 Days Forecast
      </button>
    </div>
  );
  if (err.length > 0) {
    message = <p>{err}</p>;
  }

  return <div className="container mx-auto">{message}</div>;
}
