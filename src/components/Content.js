import React from "react";
import "./Content.css";

const Content = ({ children, style }) => {
  return (
    <div className="Content" style={style}>
      {children}
    </div>
  );
};

export default Content;
