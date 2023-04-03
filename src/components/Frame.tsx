import axios from "axios";
import { useState, useEffect } from "react";

export default function Frame() {
  const [loc, setLoc] = useState<string>();
  const [temp, setTemp] = useState<string>();
  const [err, setErr] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [cond, setCond] = useState<string>();
  const [next, setNext] = useState<any[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const showResponse = async (
    location: string,
    forecast: string,
    icon: string,
    cond: string
  ) => {
    setLoc(location);
    setTemp(forecast);
    setIcon(icon);
    setCond(cond);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat: number = position.coords.latitude;
      const long: number = position.coords.longitude;
      fetchData(lat, long);
    });

    function fetchData(lat: number, long: number) {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=eea7fd6ff63e4602977155650230104&q=${lat},${long}`
        )
        .then((response) => {
          const location: string = response.data.location.name;
          const forecast: string = response.data.current.temp_c;
          const icon: string = response.data.current.condition.icon;
          const cond: string = response.data.current.condition.text;
          showResponse(location, forecast, icon, cond);
        })
        .catch((error) => {
          setErr(error.message);
        });
    }
  }, []);

  function fetchForecastData(lat: number, long: number) {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=eea7fd6ff63e4602977155650230104&q=${lat},${long}&days=7`
      )
      .then((response) => {
        let week_data: Array<any> = response.data.forecast["forecastday"].map(
          (item: any) => {
            return {
              date: item.date,
              avgtemp: item.day.avgtemp_c,
              icon: item.day.condition.icon,
              humidity: item.day.avghumidity,
              maxwind: item.day.maxwind_kph,
              condition : item.day.condition.text
            };
          }
        );
        setNext(week_data);
        console.log(next);
      })
      .catch();
  }
  const forecastHandler = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const lat: number = position.coords.latitude;
      const long: number = position.coords.longitude;
      fetchForecastData(lat, long);
    });
  };

  const isLoadingHandler = () => {
    setIsLoading(false);

    setNext([]);
  };

  let message = (
    <div className="grid justify-items-center">
      <img src={icon} alt="" />
      <p className="font-mono text-base my-5 mb-5">
        Hey, its {cond} out there. Your Location is {loc} and Temperature is{" "}
        {temp}°C
      </p>
      {!isloading && (
        <button
          className="rounded-full bg-sky-500/75 hover:bg-sky-500/100 px-5 py-3 my-5"
          onClick={forecastHandler}
        >
          See Next 7 Days Forecast
        </button>
      )}
      {isloading && (
        <button
          className="rounded-full bg-sky-500/75 hover:bg-sky-500/100 px-5 py-3 my-5"
          onClick={isLoadingHandler}
        >
          Close The Forecast
        </button>
      )}
      <div>
        {next.map((item) => (
          <div>
            <p className="font-mono text-base text-3xl w-full">
             Forecast on {item["date"]} :
            </p>
            <div className="flex rounded-lg border-solid border-2 shadow-md border-sky-500 my-5">
              <img src={item.icon} alt="" className="w-20 h-24 my-6" />
              <div className="flex-auto">
                <p className="font-mono text-base my-12 text-5xl">
                  {item["avgtemp"]}°C
                </p>
              </div>
              <div className="flex ">
                <div className="p-5">
                  <p className="font-mono text-base mx-7">
                    It Will Be {item["condition"]} Outside
                  </p>
                  <p className="font-mono text-base my-3 mx-20">
                    Humidity:{item["humidity"]}%
                  </p>
                  <p className="font-mono text-base my-3">
                    Maximum Wind Speed: {item["maxwind"]} kmph
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  if (err.length > 0) {
    message = <p>{err}</p>;
  }

  return <div className="flex justify-around">{message}</div>;
}
