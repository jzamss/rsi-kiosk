import React from "react";
import "./LguMasterTemplate.css";
import LguHeader from "./LguHeader";
import Footer from "../components/Footer";

const LguMasterTemplate = ({ children, partner = {} }) => {
  return (
    <div className="LguMasterTemplate">
      <LguHeader partner={partner} />
      <div className="LguMasterTemplate__content">{children}</div>
      <Footer />
    </div>
  );
};

export default LguMasterTemplate;
