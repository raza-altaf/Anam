// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState(calculateStartTime());
  const [password, setPassword] = useState("143anam");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [clockInterval, setClockInterval] = useState(null);
  const [isClockPaused, setIsClockPaused] = useState(false);
  const [clock, setClock] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function calculateStartTime() {
    const customDate = new Date("December 7, 2023 18:30:00"); // 6:30 PM on December 7, 2023
    return customDate.getTime();
  }

  useEffect(() => {
    if (!isClockPaused) {
      const intervalId = setInterval(updateClock, 1000);
      setClockInterval(intervalId);
      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [isClockPaused]);

  const updateClock = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    setClock({ days, hours, minutes, seconds });
  };

  const toggleClock = () => {
    setIsClockPaused((prevIsClockPaused) => !prevIsClockPaused);
  };

  const resetClock = (e) => {
    e.preventDefault();

    if (enteredPassword === password) {
      toggleClock();
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <>
      <div className="App">
        <div id="clock">
          {clock.days} days, {clock.hours} hours, {clock.minutes} minutes,{" "}
          {clock.seconds} seconds
        </div>
      </div>

      {/* Password section outside the App div */}
      <footer>
        <div id="password-section">
          <label htmlFor="password">Enter Password: </label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <button onClick={resetClock}>
            {isClockPaused ? "CONTINUE" : "STOP"}
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;
