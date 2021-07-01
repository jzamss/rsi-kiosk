import React from "react";
import "./LguHeader.css";
import { AppBar } from "rsi-react-components";

const LguHeader = ({ partner }) => {
  return (
    <AppBar>
      <header className="LguHeader">
        {partner.id && (
          <img
            className="LguHeader__icon"
            src={`/assets/${partner.id}.png`}
            alt="Lgu"
          />
        )}
        <label className="LguHeader__lgu">{partner.title}</label>
      </header>
    </AppBar>
  );
};

export default LguHeader;
