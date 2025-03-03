import React, { useEffect } from "react";
import "../css/Clock.css";

const Clock = () => {
  useEffect(() => {
    let animationFrameId;

    const calculateHandAngle = (value, total) => {
      // Calculate angle for clock hands: (value / total) * 360 - 90 (to align 12 o'clock at the top)
      return (value / total) * 360 - 90;
    };

    const updateClock = () => {
      try {
        const now = new Date();
        const ms = now.getMilliseconds();
        const seconds = now.getSeconds() + ms / 1000; // Include milliseconds for smoother motion
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        // Calculate angles for each hand
        const secondAngle = calculateHandAngle(seconds, 60);
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

        // Request next frame for smooth animation
        animationFrameId = requestAnimationFrame(updateClock);
      } catch (error) {
        console.error("Error updating clock:", error);
        // Fallback: Use setInterval if requestAnimationFrame fails
        if (!window.requestAnimationFrame) {
          setInterval(updateClock, 1000);
        }
      }
    };

    // Start the clock
    if (window.requestAnimationFrame) {
      updateClock();
    } else {
      console.warn(
        "Browser does not support requestAnimationFrame. Using setInterval as fallback."
      );
      setInterval(updateClock, 1000);
    }

    // Cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  // Array of numbers for clock face
  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const radius = 42; // Radius for positioning numbers (in percentage)

  return (
    <div className="clock-container">
      <h1>Analog Clock Cốc Cốc</h1>
      <div className="clock">
        <div className="clock-face">
          {numbers.map((num, i) => {
            // Calculate position for each number around the circle
            // Angle = (i * 30 - 90) * (Math.PI / 180) to position numbers at 30° intervals, starting at 12 o'clock
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 50 + radius * Math.cos(angle); // X position in percentage
            const y = 50 + radius * Math.sin(angle); // Y position in percentage
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
        {/* Clock hands */}
        <div className="hand hour" />
        <div className="hand minute" />
        <div className="hand second" />
        {/* Center dot */}
        <div className="center" />
      </div>
    </div>
  );
};

export default Clock;
