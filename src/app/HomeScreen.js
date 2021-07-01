import React from "react";
import FilipizenLogo from "../assets/filipizen.svg";
import MasterTemplate from "../templates/MasterTemplate";
import "./HomeScreen.css";

const HomeScreen = (props) => {
  const startHandler = () => {
    props.history.push("/partners");
  };

  return (
    <MasterTemplate showHeader={false}>
      <div className="HomeScreen">
        <img
          className="HomeScreen__image"
          src={FilipizenLogo}
          alt="filipizen logo"
        />
        <div className="HomeScreen__infoContainer">
          <div className="HomeScreen__information">
            <label className="HomeScreen__title">
              Experience ease of doing business with the government
            </label>
            <label className="HomeScreen__description">
              Over 50 local government units participating all over the
              Philippines.
            </label>
          </div>
          <button className="HomeScreen__button" onClick={startHandler}>
            Start Here
          </button>
        </div>
      </div>
    </MasterTemplate>
  );
};

export default HomeScreen;
