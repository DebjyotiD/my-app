import axios from "axios";
import React, { useState, useEffect } from "react";

function Search() {
  const [area, setArea] = useState<string>("");
  const [lat, setLat] = useState<any>();
  const [long, setLong] = useState<any>();

  useEffect(() => {
    const getGeoData = setTimeout(() => {
      if (area.length > 0) {
        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${area}&appid=86bddd28d11952dae3e046a9dbe36918`
          )
          .then((response) => {
            const fetchedData: Array<any> = response.data;
            setLat(fetchedData[0].lat);
            setLong(fetchedData[0].lon);
            console.log(fetchedData[0].lat, fetchedData[0].lon);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }, 2000);
    return () => clearTimeout(getGeoData);
  }, [area]);

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
    </div>
  );
}

export default Search;
