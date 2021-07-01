import React from "react";
import "./FilipizenTemplate.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LinearProgress } from "rsi-react-components";

const FilipizenTemplate = ({ children, loading = false }) => {
  return (
    <div className="FilipizenTemplate">
      <Header style={{ paddingLeft: 50 }} />
      {loading && <LinearProgress />}
      {!loading && (
        <>
          <div className="FilipizenTemplate__content">{children}</div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default FilipizenTemplate;
