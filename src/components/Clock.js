import React, { useEffect } from "react";
import "../CSS/Clock.css";

const Clock = () => {
  useEffect(() => {
    let animationFrameId;

    const updateClock = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds() + ms / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      const secondAngle = (seconds / 60) * 360 + 90;
      const minuteAngle = (minutes / 60) * 360 + 90;
      const hourAngle = (hours / 12) * 360 + 90;

      document.documentElement.style.setProperty(
        "--second-offset",
        `${secondAngle}deg`
      );
      document.documentElement.style.setProperty(
        "--minute-offset",
        `${minuteAngle}deg`
      );
      document.documentElement.style.setProperty(
        "--hour-offset",
        `${hourAngle}deg`
      );

      animationFrameId = requestAnimationFrame(updateClock);
    };

    updateClock();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const radius = 42;

  return (
    <div className="clock-container">
      <h1>Analog Clock Cốc Cốc</h1>
      <div className="clock">
        <div className="clock-face">
          {numbers.map((num, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return (
              <div
                key={num}
                className="clock-number"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {num}
              </div>
            );
          })}
        </div>
        <div className="hand hour" />
        <div className="hand minute" />
        <div className="hand second" />
        <div className="center" />
      </div>
    </div>
  );
};

export default Clock;
