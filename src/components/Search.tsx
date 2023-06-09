import axios from "axios";
import React, { useState, useEffect } from "react";

function Search() {
  const [area, setArea] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>();
  const [show, setShow] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [icon, setIcon] = useState<string>(
    "https://freesvg.org/img/1488160651.png"
  );
  const [cond, setCond] = useState<string>();
  const [temp, setTemp] = useState<string>("FETCHING..");
  const [match, setMatch] = useState<string>("");

  function showData() {
    if (lat > 0) {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=eea7fd6ff63e4602977155650230104&q=${lat},${long}`
        )
        .then((response) => {
          setTemp(response.data.current.temp_c);
          setCond(response.data.current.condition.text);
          setIcon(response.data.current.condition.icon);
          setLat(0);
          setLong(0);
          if (match !== area) {
            setTemp("FETCHING..");
            setCond("");
            setIcon("https://freesvg.org/img/1488160651.png");
          }
        })
        .catch((error) => {
          setErr(error);
          setShow(false);
        });
    }
  }

  useEffect(() => {
    const getGeoData = setTimeout(() => {
      if (area.length > 2) {
        setShow(true);

        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${area}&appid=86bddd28d11952dae3e046a9dbe36918`
          )
          .then((response) => {
            const fetchedData: Array<any> = response.data;
            setLat(fetchedData[0].lat);
            setLong(fetchedData[0].lon);
            setMatch(area);
          })
          .catch((error) => {
            setErr(error);
            setShow(false);
          });
      } else {
        setShow(false);
      }
    }, 1000);
    return () => clearTimeout(getGeoData);
  }, [area]);

  if (lat && area.length > 2) {
    showData();
  }

  let message = <div className=" grid  justify-center">{err}</div>;

  if (area.length > 2) {
    message = (
      <div className=" grid  justify-center">
        <label className="flex text-2xl text-sky-500 capitalize justify-center text-shadow">
          Temperature in {area}
        </label>

        <div className="flex rounded-lg border-solid border-2 shadow-md border-sky-500 my-5 hover:bg-sky-500/75 hover:text-white transition duration-300">
          <img src={icon} alt="" className="w-20 h-24 my-6" />
          <div className="flex-auto">
            <p
              className="font-mono text-base my-7"
              style={{ fontSize: "2em", padding: "1em" }}
            >
              {temp}°C
            </p>
          </div>
          <div className="flex ">
            <div className="p-5">
              <p className="font-mono text-base flex justify-center my-10 capitalize">
                It Is {cond} Outside
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end py-5 pt-5 mr-5">
        <input
          className=" rounded-full border border-gray-400 py-2 px-4 placeholder-gray-400/60"
          type="search"
          placeholder="Search"
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
      {show && <div> {message}</div>}
    </div>
  );
}

export default Search;
