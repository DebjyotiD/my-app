import React, { useEffect, useState } from "react";

function Time() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="flex justify-center">
      <p className="text-2xl oldstyle-nums subpixel-antialiased lining-nums my-10">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default Time;
