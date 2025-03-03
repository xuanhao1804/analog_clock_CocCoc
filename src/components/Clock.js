import React, { useEffect } from "react";
import "../css/Clock.css";

const Clock = () => {
  useEffect(() => {
    let animationFrameId;
    let previousSeconds = 0;
    let secondRotationOffset = 0;

    // Calculate angle: (value / total) * 360 - 90 to align 12 o'clock at the top
    const calculateHandAngle = (value, total) => (value / total) * 360 - 90;

    const updateClock = () => {
      try {
        const now = new Date();
        const ms = now.getMilliseconds();
        const rawSeconds = now.getSeconds() + ms / 1000;
        // When seconds reset (from 59 to 0), add 360° to maintain continuous rotation
        if (rawSeconds < previousSeconds) {
          secondRotationOffset += 360;
        }
        previousSeconds = rawSeconds;

        const seconds = rawSeconds % 60;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        const secondAngle =
          calculateHandAngle(seconds, 60) + secondRotationOffset;
        const minuteAngle = calculateHandAngle(minutes, 60);
        const hourAngle = calculateHandAngle(hours, 12);

        // Update CSS custom properties for hand rotations
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
      } catch (error) {
        console.error("Error updating clock:", error);
        if (!window.requestAnimationFrame) {
          setInterval(updateClock, 1000);
        }
      }
    };

    if (window.requestAnimationFrame) {
      updateClock();
    } else {
      console.warn(
        "requestAnimationFrame not supported; using setInterval as fallback."
      );
      setInterval(updateClock, 1000);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
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
