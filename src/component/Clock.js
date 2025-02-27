import React, { useState, useEffect } from "react";
import "../CSS/Clock.css";

import coccocLogo from "./Cốc_Cốc_logo.svg.png";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  //clockwise angle calculation
  const secondDeg = (seconds / 60) * 360 + 90;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;

  return (
    <div className="clock" style={{ backgroundImage: `url(${coccocLogo})` }}>
      <div
        className="hand hour"
        style={{ transform: `rotate(${hourDeg}deg)` }}
      />
      <div
        className="hand minute"
        style={{ transform: `rotate(${minuteDeg}deg)` }}
      />
      <div
        className="hand second"
        style={{ transform: `rotate(${secondDeg}deg)` }}
      />
      <div className="center" />
    </div>
  );
};

export default Clock;
