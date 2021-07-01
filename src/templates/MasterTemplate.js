import React from "react";
import "./MasterTemplate.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

const MasterTemplate = ({ showHeader = true, showFooter = true, children }) => {
  return (
    <div className="MasterTemplate">
      {showHeader && <Header />}
      <Content>{children}</Content>
      {showFooter && <Footer />}
    </div>
  );
};

export default MasterTemplate;
