import React from "react";
import "./SplashScreen.css";

const SplashScreen = ({onClick}) => {
  return (
    <div className="SplashScreen">
        <h1>Filipizen Kiosk</h1>
        <button className="SplashScreen__button" onClick={onClick}>
          Start Here
        </button>
    </div>
  );
};

export default SplashScreen;
