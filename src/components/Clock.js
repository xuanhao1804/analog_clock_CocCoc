import React, { useState, useEffect } from "react";
import "../CSS/Clock.css";
import coccocLogo from "../assert/images/Cốc_Cốc_logo.svg.png";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360 + 90;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="clock-container">
      <h1>React Analog Clock</h1>
      <div
        className="clock"
        style={{
          backgroundImage: `url(${coccocLogo})`,
          backgroundSize: "80%",
          backgroundPosition: "center",
        }}
      >
        <div className="clock-face">
          {numbers.map((num, i) => {
            const angle = i * 30 + 270;
            return (
              <div
                key={num}
                className="clock-number"
                style={{
                  transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

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
    </div>
  );
};

export default Clock;
