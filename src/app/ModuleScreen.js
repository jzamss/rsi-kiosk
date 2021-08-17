import React from "react";
import { Title, Link } from "rsi-react-components";
import { usePartnerFromLocation } from "rsi-react-filipizen";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import "./ModuleScreen.css";

const ServiceList = ({ module, onSelect }) => {
  return (
    <div className="ModuleScreen__services">
      {module.services.map((service) => (
        <div key={service.name} className="ModuleScreen__service">
          <Link component="button" onClick={() => onSelect(service)}>
            {service.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

const ModuleScreen = ({ history, location }) => {
  const { partner, module } = location.state;

  const onSelectService = (service) => {
    history.push({
      pathname: `/service/${module.name}/${service.name}`,
      state: { partner, module, service },
    });
  };

  return (
    <LguMasterTemplate partner={partner}>
      <div className="HomeScreen">
        <Title>{module.title}</Title>
        <ServiceList module={module} onSelect={onSelectService} />
      </div>
    </LguMasterTemplate>
  );
};

export default ModuleScreen;
