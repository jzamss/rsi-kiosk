import React, { useState, useEffect } from "react";
import { Title, Subtitle, Link } from "rsi-react-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import { getModules } from "../modules";
import SplashScreen from "./SplashScreen";
import UnderMaintenance from "../components/UnderMaintenance";
import "./HomeScreen.css";

const ModuleList = (props) => {
  const { modules, onSelect } = props;

  return (
    <div className="HomeScreen__modules">
      {modules.map((module, idx) => {
        return (
          <div key={`${module.name}${idx}`} className="HomeScreen__module" onClick={() => onSelect(module)}>
            <Subtitle>{module.title}</Subtitle>
          </div>
        );
      })}
    </div>
  );
};

const HomeScreen = ({ history }) => {
  const [partner, setPartner] = useState();
  const [modules, setModules] = useState();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    //TODO: load partner info from server
    setPartner({
      id: "00001",
      name: "CARCAR",
      group: {name: 'CEBU'},
      includeservices: '.*'
    });
  }, []);

  useEffect(() => {
    if (!partner) return;
    setModules(getModules(partner));
  }, [partner]);

  const onSelectModule = (module) => {
    history.push({
      pathname: `/service/${module.name}`,
      state: { partner, module },
    });
  };

  const hideSplash = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onClick={hideSplash} />;
  }

  if (!partner || !modules) return null;

  return (
      <LguMasterTemplate partner={partner}>
        {modules.length > 0 ? (
          <div className="HomeScreen">
            <Title>Select Transaction</Title>
            <ModuleList modules={modules} onSelect={onSelectModule} />
          </div>
        ) : (
          <UnderMaintenance containerStyle={{ marginTop: 40 }} />
        )}
      </LguMasterTemplate>
    
  );
};



export default HomeScreen;
