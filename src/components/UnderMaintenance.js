import React from "react";
import "./UnderMaintenance.css";

const UnderMaintenance = ({ containerStyle }) => {
  return (
    <div className="UnderMaintenance__maintenance" style={containerStyle}>
      <div className="UnderMaintenance__info">
        <label className="UnderMaintenance__title">
          Website under maintenance
        </label>
        <p>
          This website is currently undergoing a scheduled maintenance. Will
          return shortly. Our apologies for the inconvenience.
        </p>
      </div>
      <img
        className="UnderMaintenance__image"
        src="/assets/filipizen.png"
        alt="Under Maintenance"
      />
    </div>
  );
};

export default UnderMaintenance;
