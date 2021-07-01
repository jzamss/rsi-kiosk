import React, { useState, useEffect } from "react";
import { Title, Subtitle, Link } from "rsi-react-components";
import { usePartnerFromLocation } from "rsi-react-filipizen";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import UnderMaintenance from "../components/UnderMaintenance";
import { getModules } from "../modules";
import "./PartnerScreen.css";

const ServiceList = (props) => {
  const { modules, onSelect } = props;
  return (
    <div className="PartnerScreen__modules">
      {modules.map((module, idx) => {
        return (
          <div key={`${module.name}${idx}`} className="PartnerScreen__module">
            <Subtitle>{module.title}</Subtitle>
            {module.services.map((service) => (
              <Link
                key={service.name}
                component="button"
                onClick={() => onSelect(module, service)}
              >
                {service.title}
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const PartnerScreen = ({ location, history }) => {
  const [partner, setPartner, isPartnerError] = usePartnerFromLocation(location);
  const [modules, setModules] = useState();

  useEffect(() => {
    if (!partner) return;
    setModules(getModules(partner));
  }, [partner]);

  useEffect(() => {
    if (isPartnerError) {
      history.push("/partners");
    }
  }, [isPartnerError, history]);

  const onSelectService = (module, service) => {
    history.push({
      pathname: `/partner/${partner.group.name}_${partner.name}/${module.name}/${service.name}`,
      state: { partner, module, service },
    });
  };

  if (!partner || !modules) return null;

  return (
    <LguMasterTemplate partner={partner}>
      {modules.length > 0 ? (
        <div className="PartnerScreen">
          <Title>Select Transaction</Title>
          <ServiceList modules={modules} onSelect={onSelectService} />
        </div>
      ) : (
        <UnderMaintenance containerStyle={{ marginTop: 40 }} />
      )}
    </LguMasterTemplate>
  );
};

export default PartnerScreen;
